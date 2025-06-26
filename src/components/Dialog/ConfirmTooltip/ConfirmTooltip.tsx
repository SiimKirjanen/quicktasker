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
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipWidth = 224;

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipHeight = 100; // Approximate height, adjust as needed
      const spacing = 8; // Gap between trigger and tooltip

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

      // Ensure tooltip doesn't go off-screen
      top = Math.max(0, top);
      left = Math.max(0, left);
      left = Math.min(left, window.innerWidth - tooltipWidth - 10);

      setTooltipPosition({ top, left });
    }
  }, [isOpen, position]);

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
    if (!isOpen) return;

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
  }, [isOpen]);

  return (
    <div className={`wpqt-relative ${containerClassName}`} ref={triggerRef}>
      {children({ onClick: handleOpen })}

      {isOpen && (
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
