import { createRoot } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import PublicTaskForm from "./PublicTaskForm";

function mount(): void {
  const containers = document.querySelectorAll<HTMLElement>(
    "[data-wpqt-public-task-form]",
  );
  containers.forEach((el) => {
    if (el.dataset.wpqtMounted) return;
    el.dataset.wpqtMounted = "1";
    const pipelineId = parseInt(el.dataset.pipelineId || "0", 10);
    const submitLabel =
      el.dataset.submitLabel || __("Submit task", "quicktasker");
    const successMessage =
      el.dataset.successMessage ||
      __("Thanks! Your task has been submitted.", "quicktasker");
    if (!pipelineId) {
      el.textContent = __(
        "QuickTasker block: no board selected.",
        "quicktasker",
      );
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
