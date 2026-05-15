import { useEffect, useState } from "@wordpress/element";
import { getPipelineStatusRequest } from "./api/public-task-api";
import BoardClosedMessage from "./components/BoardClosedMessage";
import LoadingState from "./components/LoadingState";
import SubmissionsList from "./components/SubmissionsList";
import TaskForm from "./components/TaskForm";
import "./style.css";
import type { BoardStatus } from "./types";
import { getInitialHashes, writeStoredHashes } from "./utils/tracking";

type Props = {
  pipelineId: number;
  submitLabel: string;
  successMessage: string;
  preview?: boolean;
};

export default function PublicTaskForm({
  pipelineId,
  submitLabel,
  successMessage,
  preview = false,
}: Props) {
  const [trackedHashes, setTrackedHashes] = useState<string[]>(() =>
    preview ? [] : getInitialHashes(pipelineId),
  );
  const [boardStatus, setBoardStatus] = useState<BoardStatus | null>(null);

  useEffect(() => {
    if (!pipelineId || preview) return;
    let cancelled = false;
    setBoardStatus(null);
    const loadStatus = async () => {
      try {
        const body = await getPipelineStatusRequest(pipelineId);
        if (cancelled) return;
        if (body && body.success && body.data) {
          setBoardStatus(body.data);
        } else {
          setBoardStatus({ enabled: false });
        }
      } catch (_e) {
        if (!cancelled) setBoardStatus({ enabled: false });
      }
    };
    loadStatus();
    return () => {
      cancelled = true;
    };
  }, [pipelineId, preview]);

  const handleSubmitted = (hash: string) => {
    const next = [hash, ...trackedHashes.filter((h) => h !== hash)];
    writeStoredHashes(pipelineId, next);
    setTrackedHashes(next);
  };

  if (boardStatus === null && pipelineId && !preview) {
    return <LoadingState />;
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
        <TaskForm
          pipelineId={pipelineId}
          submitLabel={submitLabel}
          successMessage={successMessage}
          preview={preview}
          onSubmitted={handleSubmitted}
        />
      ) : boardStatus ? (
        <BoardClosedMessage boardStatus={boardStatus} />
      ) : null}

      {!preview && trackedHashes.length > 0 && (
        <SubmissionsList
          pipelineId={pipelineId}
          trackedHashes={trackedHashes}
        />
      )}
    </div>
  );
}
