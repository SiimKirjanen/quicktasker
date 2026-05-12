import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { __, sprintf } from "@wordpress/i18n";
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
};

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
}: Props) {
  const allSelected =
    options.length > 0 && selectedValues.length === options.length;

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
      <div className="wpqt-relative">
        <ListboxButton
          id={id}
          className={`wpqt-flex wpqt-h-[30px] wpqt-items-center wpqt-gap-2 wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-px-2 wpqt-text-left focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`}
        >
          <span>{triggerLabel}</span>
          <ChevronDownIcon className="wpqt-size-4 wpqt-text-gray-500" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="wpqt-z-50 wpqt-box-border wpqt-mt-1 wpqt-max-h-60 wpqt-w-max wpqt-min-w-[--button-width] wpqt-max-w-xs wpqt-overflow-auto wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-1 wpqt-shadow-lg focus:wpqt-outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className="wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-2 wpqt-rounded wpqt-px-2 wpqt-py-1 data-[focus]:wpqt-bg-gray-100"
            >
              {({ selected }) => (
                <>
                  <span className="wpqt-flex wpqt-size-4 wpqt-shrink-0 wpqt-items-center wpqt-justify-center wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder">
                    {selected && <CheckIcon className="wpqt-size-3" />}
                  </span>
                  <span>{option.label}</span>
                </>
              )}
            </ListboxOption>
          ))}
          {options.length > 0 && (
            <div className="wpqt-mt-1 wpqt-flex wpqt-items-center wpqt-gap-3 wpqt-px-2 wpqt-py-1 wpqt-text-sm">
              {!allSelected && (
                <div
                  role="button"
                  tabIndex={-1}
                  data-testid="multi-select-reset"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelectionChange(options.map((o) => o.value));
                  }}
                  className="wpqt-cursor-pointer wpqt-blue-text hover:wpqt-text-qtBlueHover focus:wpqt-outline-none"
                >
                  {resetLabel ?? __("Reset to all", "quicktasker")}
                </div>
              )}
              {selectedValues.length > 0 && (
                <div
                  role="button"
                  tabIndex={-1}
                  data-testid="multi-select-deselect"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelectionChange([]);
                  }}
                  className="wpqt-cursor-pointer wpqt-blue-text hover:wpqt-text-qtBlueHover focus:wpqt-outline-none"
                >
                  {deselectLabel ?? __("Deselect all", "quicktasker")}
                </div>
              )}
            </div>
          )}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export { WPQTMultiSelect };
