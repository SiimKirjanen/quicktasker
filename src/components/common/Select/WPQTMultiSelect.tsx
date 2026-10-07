import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { LoadingOval } from "../../Loading/Loading";
import type { Option } from "./WPQTSelect";

type Props = {
  options: Option[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  allLabel?: string;
  noneLabel?: string;
  resetLabel?: string;
  deselectLabel?: string;
  className?: string;
  id?: string;
  autoOpen?: boolean;
  onClose?: () => void;
  // Options that show a spinner, such as changes still being saved.
  loadingValues?: string[];
  // Replaces the select-style button with custom content, such as a link.
  trigger?: React.ReactNode;
  triggerClassName?: string;
  ariaLabel?: string;
  buttonTestId?: string;
};

function CloseWatcher({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const wasOpen = useRef(open);

  useEffect(() => {
    if (wasOpen.current && !open) {
      onClose();
    }
    wasOpen.current = open;
  }, [open]);

  return null;
}

function FooterAction({
  testId,
  disabled,
  onClick,
  children,
}: {
  testId: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      role="button"
      tabIndex={-1}
      aria-disabled={disabled}
      data-testid={testId}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) {
          onClick();
        }
      }}
      className={`focus:wpqt-outline-none ${
        disabled
          ? "wpqt-cursor-default wpqt-text-gray-400"
          : "wpqt-cursor-pointer wpqt-blue-text hover:wpqt-text-qtBlueHover"
      }`}
    >
      {children}
    </div>
  );
}

function WPQTMultiSelect({
  options,
  selectedValues,
  onSelectionChange,
  allLabel = __("All", "quicktasker"),
  noneLabel = __("None", "quicktasker"),
  resetLabel,
  deselectLabel,
  className = "",
  id,
  autoOpen = false,
  onClose,
  loadingValues = [],
  trigger,
  triggerClassName,
  ariaLabel,
  buttonTestId,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoOpen) {
      buttonRef.current?.click();
    }
  }, []);

  // Values that are not options, like ones for boards created since the options
  // were loaded, do not count.
  const allSelected =
    options.length > 0 &&
    options.every((option) => selectedValues.includes(option.value));

  const triggerLabel = (() => {
    if (allSelected) {
      return allLabel;
    }
    if (selectedValues.length === 0) {
      return noneLabel;
    }
    if (selectedValues.length === 1) {
      const match = options.find((o) => o.value === selectedValues[0]);
      return match ? match.label : allLabel;
    }
    return sprintf(
      // translators: %d is the number of selected items
      __("%d selected", "quicktasker"),
      selectedValues.length,
    );
  })();

  return (
    <Listbox value={selectedValues} onChange={onSelectionChange} multiple>
      {({ open }) => (
        <div
          className={
            trigger ? "wpqt-relative wpqt-inline-block" : "wpqt-relative"
          }
        >
          {onClose && <CloseWatcher open={open} onClose={onClose} />}
          <ListboxButton
            ref={buttonRef}
            id={id}
            aria-busy={loadingValues.length > 0}
            aria-label={ariaLabel}
            data-testid={buttonTestId}
            className={
              trigger
                ? `wpqt-inline-flex wpqt-items-center wpqt-gap-2 ${triggerClassName ?? ""}`
                : `wpqt-flex wpqt-min-h-[38px] wpqt-items-center wpqt-gap-2 wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-px-2 wpqt-py-1 wpqt-text-left focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`
            }
          >
            <span>{trigger ?? triggerLabel}</span>
            {!trigger && (
              <ChevronDownIcon className="wpqt-size-4 wpqt-text-gray-500" />
            )}
          </ListboxButton>
          <ListboxOptions
            anchor="bottom start"
            className="wpqt-z-50 wpqt-box-border wpqt-mt-1 wpqt-max-h-60 [--anchor-max-height:15rem] wpqt-w-max wpqt-min-w-[--button-width] wpqt-max-w-xs wpqt-overflow-auto wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-1 wpqt-shadow-lg focus:wpqt-outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                aria-busy={loadingValues.includes(option.value)}
                className="wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-2 wpqt-rounded wpqt-px-2 wpqt-py-1 data-[focus]:wpqt-bg-gray-100"
              >
                {({ selected }) => (
                  <>
                    <span className="wpqt-flex wpqt-size-4 wpqt-shrink-0 wpqt-items-center wpqt-justify-center wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder">
                      {selected && <CheckIcon className="wpqt-size-3" />}
                    </span>
                    <span>{option.label}</span>
                    {loadingValues.includes(option.value) && (
                      <span
                        aria-hidden="true"
                        className="wpqt-ml-auto wpqt-flex wpqt-shrink-0 wpqt-pl-2"
                        data-testid="multi-select-option-loading"
                      >
                        <LoadingOval width="14" height="14" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
            {options.length > 0 && (
              // Sticks to the bottom so it stays visible when the list scrolls.
              <div className="wpqt-sticky wpqt--bottom-1 wpqt--mx-1 wpqt--mb-1 wpqt-mt-1 wpqt-flex wpqt-items-center wpqt-gap-3 wpqt-border-0 wpqt-border-t wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-px-3 wpqt-py-1.5 wpqt-text-sm">
                {/* Both actions are always shown, so the row does not shift
                    when one of them does not apply. */}
                <FooterAction
                  testId="multi-select-reset"
                  disabled={allSelected}
                  onClick={() => onSelectionChange(options.map((o) => o.value))}
                >
                  {resetLabel ?? __("Reset to all", "quicktasker")}
                </FooterAction>
                <FooterAction
                  testId="multi-select-deselect"
                  disabled={selectedValues.length === 0}
                  onClick={() => onSelectionChange([])}
                >
                  {deselectLabel ?? __("Deselect all", "quicktasker")}
                </FooterAction>
              </div>
            )}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
}

export { WPQTMultiSelect };
