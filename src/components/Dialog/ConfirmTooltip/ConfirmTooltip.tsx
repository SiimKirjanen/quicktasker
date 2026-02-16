import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import type { ReactNode } from "react";
import { ButtonStyleType, WPQTButton } from "../../common/Button/Button";

type TooltipPosition = "top" | "right" | "bottom" | "left";
type Props = {
  onConfirm: () => void | Promise<void>;
  confirmMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  children: (props: { onClick: (e: React.MouseEvent) => void }) => ReactNode;
  position?: TooltipPosition;
  containerClassName?: string;
};

function WPQTConfirmTooltip({
  onConfirm,
  confirmMessage = __("Are you sure?", "quicktasker"),
  confirmButtonText = __("Yes", "quicktasker"),
  cancelButtonText = __("No", "quicktasker"),
  children,
  position = "bottom",
  containerClassName = "",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipWidth = 224;
  const showTooltip = isOpen && tooltipPosition !== null;

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spacing = 8; // Gap between trigger and tooltip
      let tooltipHeight = 100; // Fallback height

      // Try to get actual tooltip height if already rendered
      if (tooltipRef.current) {
        tooltipHeight = tooltipRef.current.offsetHeight;
      }

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = rect.top - tooltipHeight - spacing;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "right":
          top = rect.top;
          left = rect.right + spacing;
          break;
        case "bottom":
          top = rect.bottom + spacing;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "left":
          top = rect.top;
          left = rect.left - tooltipWidth - spacing;
          break;
      }

      // Adjust if tooltip goes off the viewport
      // Vertical adjustment
      if (top < 0) {
        top = spacing;
      } else if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - spacing;
      }
      // Horizontal adjustment
      if (left < 0) {
        left = spacing;
      } else if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - spacing;
      }

      setTooltipPosition({ top, left });
    }
  }, [isOpen, position, showTooltip]);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  const handleConfirm = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    onConfirm();
    setIsOpen(false);
  };

  useEffect(() => {
    if (!showTooltip) return;

    const handleClickOutside = (event: MouseEvent) => {
      // If click is outside both the trigger and the tooltip, close the tooltip
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className={`wpqt-relative ${containerClassName}`} ref={triggerRef}>
      {children({ onClick: handleOpen })}

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="wpqt-fixed wpqt-z-50"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="wpqt-origin-top-right wpqt-main-border wpqt-bg-white wpqt-transition"
            style={{ width: `${tooltipWidth}px` }}
          >
            <div className="wpqt-p-3">
              <div className="wpqt-text-sm wpqt-mb-2">{confirmMessage}</div>
              <div className="wpqt-flex wpqt-justify-end wpqt-space-x-2">
                <WPQTButton
                  btnText={cancelButtonText}
                  onClick={handleClose}
                  buttonStyleType={ButtonStyleType.SECONDARY}
                />
                <WPQTButton
                  btnText={confirmButtonText}
                  onClick={handleConfirm}
                  buttonStyleType={ButtonStyleType.DANGER}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { WPQTConfirmTooltip };
