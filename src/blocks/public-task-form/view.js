import { createRoot } from "@wordpress/element";
import PublicTaskForm from "./PublicTaskForm";

function mount() {
  const containers = document.querySelectorAll("[data-wpqt-public-task-form]");
  containers.forEach((el) => {
    if (el.dataset.wpqtMounted) return;
    el.dataset.wpqtMounted = "1";
    const pipelineId = parseInt(el.dataset.pipelineId || "0", 10);
    const submitLabel = el.dataset.submitLabel || "Submit task";
    const successMessage =
      el.dataset.successMessage || "Thanks! Your task has been submitted.";
    if (!pipelineId) {
      el.textContent = "QuickTasker block: no board selected.";
      return;
    }
    createRoot(el).render(
      <PublicTaskForm
        pipelineId={pipelineId}
        submitLabel={submitLabel}
        successMessage={successMessage}
      />,
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
