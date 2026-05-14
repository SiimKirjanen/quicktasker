import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getTaskStatusesRequest } from "../api/public-task-api";
import type { StatusEntry } from "../types";
import { readStoredHashes, writeStoredHashes } from "../utils/tracking";
import SubmissionItem from "./SubmissionItem";

type Props = {
  pipelineId: number;
  trackedHashes: string[];
};

export default function SubmissionsList({ pipelineId, trackedHashes }: Props) {
  const [statuses, setStatuses] = useState<Record<string, StatusEntry>>({});

  useEffect(() => {
    if (trackedHashes.length === 0) return;
    const toFetch = trackedHashes.filter((hash) => !statuses[hash]);
    if (toFetch.length === 0) return;
    let cancelled = false;
    const loadStatuses = async () => {
      try {
        const body = await getTaskStatusesRequest(toFetch);
        if (cancelled) return;
        if (!body || !body.success || !body.data) {
          setStatuses((prev) => {
            const next = { ...prev };
            toFetch.forEach((hash) => {
              next[hash] = {
                ok: false,
                error: __("Could not load task status.", "quicktasker"),
              };
            });
            return next;
          });
          return;
        }

        const data = body.data;
        const goneHashes: string[] = [];
        setStatuses((prev) => {
          const next = { ...prev };
          toFetch.forEach((hash) => {
            const entry = data[hash];
            if (entry) {
              next[hash] = { ok: true, data: entry };
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
            const current = url.searchParams.get("wpqt_track");
            if (current && goneHashes.includes(current)) {
              url.searchParams.delete("wpqt_track");
              window.history.replaceState({}, "", url.toString());
            }
          } catch (_e) {
            // ignore
          }
        }
      } catch (_e) {
        if (cancelled) return;
        setStatuses((prev) => {
          const next = { ...prev };
          toFetch.forEach((hash) => {
            next[hash] = { ok: false, error: "Could not load task status." };
          });
          return next;
        });
      }
    };
    loadStatuses();
    return () => {
      cancelled = true;
    };
  }, [trackedHashes, pipelineId, statuses]);

  return (
    <div className="wpqt-public-task-submissions">
      <div className="wpqt-public-task-submissions-header">
        <h3>{__("Your submissions", "quicktasker")}</h3>
        <button
          type="button"
          className="wpqt-public-task-refresh"
          onClick={() => setStatuses({})}
          aria-label={__("Refresh submissions", "quicktasker")}
          title={__("Refresh", "quicktasker")}
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
        {trackedHashes.map((hash) => (
          <SubmissionItem key={hash} entry={statuses[hash]} />
        ))}
      </ul>
    </div>
  );
}
