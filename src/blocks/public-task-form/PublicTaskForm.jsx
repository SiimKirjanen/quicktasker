import { useEffect, useState } from "@wordpress/element";
import "./style.css";

const BLOCK_SETTINGS =
  (typeof window !== "undefined" && window.wpqtPublicTaskBlock) || {};
const API_BASE =
  BLOCK_SETTINGS.root ||
  (typeof window !== "undefined" &&
    window.wpApiSettings &&
    window.wpApiSettings.root) ||
  "/wp-json/";
const REST_NONCE =
  BLOCK_SETTINGS.nonce ||
  (typeof window !== "undefined" &&
    window.wpApiSettings &&
    window.wpApiSettings.nonce) ||
  "";
const ENDPOINT_CREATE = API_BASE.replace(/\/$/, "") + "/wpqt/v1/public/tasks";
const ENDPOINT_STATUSES =
  API_BASE.replace(/\/$/, "") + "/wpqt/v1/public/tasks/statuses";
const ENDPOINT_PIPELINE_STATUS = (pipelineId) =>
  API_BASE.replace(/\/$/, "") +
  `/wpqt/v1/public/pipelines/${pipelineId}/status`;

function authHeaders(extra = {}) {
  const headers = { ...extra };
  if (REST_NONCE) headers["X-WP-Nonce"] = REST_NONCE;
  return headers;
}

const MAX_TRACKED = 10;

function trackStorageKey(pipelineId) {
  return `wpqt_pub_track_${pipelineId}`;
}

function readStoredHashes(pipelineId) {
  try {
    const raw = window.localStorage.getItem(trackStorageKey(pipelineId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function writeStoredHashes(pipelineId, hashes) {
  try {
    window.localStorage.setItem(
      trackStorageKey(pipelineId),
      JSON.stringify(hashes.slice(0, MAX_TRACKED)),
    );
  } catch (e) {
    // ignore storage errors (private mode, etc.)
  }
}

function getInitialHashes(pipelineId) {
  const stored = readStoredHashes(pipelineId);
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("wpqt_track");
    if (fromUrl && !stored.includes(fromUrl)) {
      const merged = [fromUrl, ...stored];
      writeStoredHashes(pipelineId, merged);
      return merged.slice(0, MAX_TRACKED);
    }
  } catch (e) {
    // ignore
  }
  return stored;
}

function buildTrackingUrl(hash) {
  const url = new URL(window.location.href);
  url.searchParams.set("wpqt_track", hash);
  return url.toString();
}

export default function PublicTaskForm({
  pipelineId,
  submitLabel,
  successMessage,
  preview = false,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [trackedHashes, setTrackedHashes] = useState(() =>
    preview ? [] : getInitialHashes(pipelineId),
  );
  const [statuses, setStatuses] = useState({});
  const [boardStatus, setBoardStatus] = useState(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    if (!pipelineId || preview) return;
    let cancelled = false;
    setBoardStatus(null);
    fetch(ENDPOINT_PIPELINE_STATUS(pipelineId), {
      credentials: "same-origin",
      headers: authHeaders({ Accept: "application/json" }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (cancelled) return;
        if (body && body.success && body.data) {
          setBoardStatus(body.data);
        } else {
          setBoardStatus({ enabled: false });
        }
      })
      .catch(() => {
        if (!cancelled) setBoardStatus({ enabled: false });
      });
    return () => {
      cancelled = true;
    };
  }, [pipelineId, preview]);

  useEffect(() => {
    if (preview || trackedHashes.length === 0) return;
    const toFetch = trackedHashes.filter((hash) => !statuses[hash]);
    if (toFetch.length === 0) return;
    let cancelled = false;
    fetch(ENDPOINT_STATUSES, {
      method: "POST",
      credentials: "same-origin",
      headers: authHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({ hashes: toFetch }),
    })
      .then((res) => res.json())
      .then((body) => {
        if (cancelled) return;
        if (!body || !body.success || !body.data) {
          setStatuses((prev) => {
            const next = { ...prev };
            toFetch.forEach((hash) => {
              next[hash] = { ok: false, error: "Could not load task status." };
            });
            return next;
          });
          return;
        }

        const goneHashes = [];
        setStatuses((prev) => {
          const next = { ...prev };
          toFetch.forEach((hash) => {
            const data = body.data[hash];
            if (data) {
              next[hash] = { ok: true, data };
            } else {
              next[hash] = { ok: false, gone: true };
              goneHashes.push(hash);
            }
          });
          return next;
        });

        if (goneHashes.length > 0) {
          const remaining = readStoredHashes(pipelineId).filter(
            (h) => !goneHashes.includes(h),
          );
          writeStoredHashes(pipelineId, remaining);
          try {
            const url = new URL(window.location.href);
            if (goneHashes.includes(url.searchParams.get("wpqt_track"))) {
              url.searchParams.delete("wpqt_track");
              window.history.replaceState({}, "", url.toString());
            }
          } catch (e) {
            // ignore
          }
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatuses((prev) => {
          const next = { ...prev };
          toFetch.forEach((hash) => {
            next[hash] = { ok: false, error: "Could not load task status." };
          });
          return next;
        });
      });
    return () => {
      cancelled = true;
    };
  }, [trackedHashes, preview, pipelineId, statuses]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (preview || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(ENDPOINT_CREATE, {
        method: "POST",
        credentials: "same-origin",
        headers: authHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({
          pipeline_id: pipelineId,
          name,
          description,
        }),
      });
      const body = await res.json();
      if (!body || !body.success) {
        setError(
          (body && body.errors && body.errors[0]) || "Submission failed.",
        );
        return;
      }
      const hash = body.data && body.data.task_hash;
      if (hash) {
        const next = [hash, ...trackedHashes.filter((h) => h !== hash)].slice(
          0,
          MAX_TRACKED,
        );
        writeStoredHashes(pipelineId, next);
        setTrackedHashes(next);
        setName("");
        setDescription("");
        setJustSubmitted(true);
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (boardStatus === null && pipelineId && !preview) {
    return (
      <div className="wpqt-public-task-loading">
        <span className="wpqt-public-task-spinner" aria-hidden="true" />
        <span>Loading…</span>
      </div>
    );
  }

  const canSubmit =
    preview ||
    (boardStatus &&
      boardStatus.enabled &&
      !boardStatus.limit_reached &&
      !boardStatus.login_required);

  return (
    <div>
      {canSubmit ? (
        <form className="wpqt-public-task-form" onSubmit={handleSubmit}>
          {justSubmitted && (
            <p className="wpqt-public-task-success">{successMessage}</p>
          )}
          <label>
            <span>Task title</span>
            <input
              type="text"
              required={!preview}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={255}
            />
          </label>
          <label>
            <span>Description (optional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </label>
          {error && <p className="wpqt-public-task-error">{error}</p>}
          <button
            type="submit"
            disabled={submitting || (!preview && !pipelineId)}
          >
            {submitting ? "Submitting…" : submitLabel}
          </button>
        </form>
      ) : boardStatus && !boardStatus.enabled ? (
        <div className="wpqt-public-task-closed">
          <p>This board is not currently accepting task submissions.</p>
        </div>
      ) : boardStatus && boardStatus.login_required ? (
        <div className="wpqt-public-task-closed">
          <p>
            You must be logged in as a WordPress user to submit a task to this
            board.
          </p>
        </div>
      ) : boardStatus && boardStatus.limit_reached ? (
        <div className="wpqt-public-task-closed">
          <p>This board has reached its submission limit.</p>
        </div>
      ) : null}

      {!preview && trackedHashes.length > 0 && (
        <div className="wpqt-public-task-submissions">
          <div className="wpqt-public-task-submissions-header">
            <h3>Your submissions</h3>
            <button
              type="button"
              className="wpqt-public-task-refresh"
              onClick={() => setStatuses({})}
              aria-label="Refresh submissions"
              title="Refresh"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10" />
                <path d="M20.49 15a9 9 0 01-14.85 3.36L1 14" />
              </svg>
            </button>
          </div>
          <ul className="wpqt-public-task-submissions-list">
            {trackedHashes.map((hash) => {
              const entry = statuses[hash];
              return (
                <li key={hash} className="wpqt-public-task-submission">
                  {!entry && (
                    <span className="wpqt-public-task-submission-loading">
                      Loading…
                    </span>
                  )}
                  {entry && !entry.ok && entry.gone && (
                    <span className="wpqt-public-task-submission-gone">
                      This task is no longer available.
                    </span>
                  )}
                  {entry && !entry.ok && !entry.gone && (
                    <span className="wpqt-public-task-error">
                      {entry.error}
                    </span>
                  )}
                  {entry && entry.ok && (
                    <>
                      <div className="wpqt-public-task-submission-row">
                        <span className="wpqt-public-task-submission-name">
                          {entry.data.name}
                        </span>
                        <span
                          className={
                            entry.data.is_done
                              ? "wpqt-public-task-badge wpqt-public-task-badge-done"
                              : "wpqt-public-task-badge"
                          }
                        >
                          {entry.data.is_done
                            ? "Completed"
                            : entry.data.stage_name || "In progress"}
                        </span>
                      </div>
                      <a
                        className="wpqt-public-task-submission-link"
                        href={buildTrackingUrl(hash)}
                      >
                        {buildTrackingUrl(hash)}
                      </a>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
