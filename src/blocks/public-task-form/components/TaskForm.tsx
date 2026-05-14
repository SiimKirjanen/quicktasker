import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { createPublicTaskRequest } from "../api/public-task-api";

type Props = {
  pipelineId: number;
  submitLabel: string;
  successMessage: string;
  preview?: boolean;
  onSubmitted: (hash: string) => void;
};

export default function TaskForm({
  pipelineId,
  submitLabel,
  successMessage,
  preview = false,
  onSubmitted,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (preview || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const body = await createPublicTaskRequest({
        pipeline_id: pipelineId,
        name,
        description,
      });
      if (!body || !body.success) {
        setError(
          (body && body.errors && body.errors[0]) ||
            __("Submission failed.", "quicktasker"),
        );
        return;
      }
      const hash = body.data && body.data.task_hash;
      if (hash) {
        onSubmitted(hash);
        setName("");
        setDescription("");
        setJustSubmitted(true);
      }
    } catch (_e) {
      setError(__("Network error. Please try again.", "quicktasker"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="wpqt-public-task-form" onSubmit={handleSubmit}>
      {justSubmitted && (
        <p className="wpqt-public-task-success">{successMessage}</p>
      )}
      <label>
        <span>{__("Task title", "quicktasker")}</span>
        <input
          type="text"
          required={!preview}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={255}
        />
      </label>
      <label>
        <span>{__("Description (optional)", "quicktasker")}</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </label>
      {error && <p className="wpqt-public-task-error">{error}</p>}
      <button type="submit" disabled={submitting || (!preview && !pipelineId)}>
        {submitting ? __("Submitting…", "quicktasker") : submitLabel}
      </button>
    </form>
  );
}
