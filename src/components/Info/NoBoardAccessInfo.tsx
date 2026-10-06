import { __ } from "@wordpress/i18n";
import { usePipelines } from "../../hooks/usePipelines";
import { Info } from "./Info";

type Props = {
  // Called after the address changes to the primary board, for pages that stay mounted.
  onOpenBoard?: (pipelineId: string) => void;
};

/**
 * Shown when a WordPress user opens a board, or one of its pages, they have not been added to.
 */
function NoBoardAccessInfo({ onOpenBoard }: Props) {
  const { pipelines } = usePipelines();
  const primaryPipeline =
    pipelines.find((pipeline) => pipeline.is_primary) ?? pipelines[0];

  return (
    <Info
      infoDescription={__(
        "You have not been added to this board. Ask a WordPress administrator to add you to it.",
        "quicktasker",
      )}
    >
      {primaryPipeline && (
        <div
          className="wpqt-blue-text wpqt-blue-text-hover wpqt-cursor-pointer"
          data-testid="open-primary-board"
          onClick={() => {
            // Changing the address clears the no access state.
            window.location.hash = `#/board/${primaryPipeline.id}`;
            onOpenBoard?.(primaryPipeline.id);
          }}
        >
          {__("Open your primary board", "quicktasker")}
        </div>
      )}
    </Info>
  );
}

export { NoBoardAccessInfo };
