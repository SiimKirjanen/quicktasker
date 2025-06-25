import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import type { ReactNode } from "react";
import { WPQTButton } from "../../common/Button/Button";

type Props = {
  onConfirm: () => void | Promise<void>;
  confirmMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  children: (props: { onClick: (e: React.MouseEvent) => void }) => ReactNode;
};

function WPQTConfirmTooltip({
  onConfirm,
  confirmMessage = __("Are you sure?", "quicktasker"),
  confirmButtonText = __("Yes", "quicktasker"),
  cancelButtonText = __("No", "quicktasker"),
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom,
        left: rect.right - 224, // 224px = width of tooltip (w-56)
      });
    }
  }, [isOpen]);

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
    <div className="wpqt-relative" ref={triggerRef}>
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
          <div className="wpqt-w-56 wpqt-origin-top-right wpqt-rounded-md wpqt-bg-white wpqt-shadow-lg wpqt-ring-1 wpqt-ring-black wpqt-ring-opacity-5">
            <div className="wpqt-p-3">
              <div className="wpqt-text-sm wpqt-mb-2">{confirmMessage}</div>
              <div className="wpqt-flex wpqt-justify-end wpqt-space-x-2">
                <WPQTButton btnText={cancelButtonText} onClick={handleClose} />
                <WPQTButton
                  btnText={confirmButtonText}
                  onClick={handleConfirm}
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
