import { __ } from "@wordpress/i18n";

type Props = {
  text?: string;
};
function NoFilterResults({
  text = __("No results found", "quicktasker"),
}: Props) {
  return (
    <div className="wpqt-flex wpqt-items-center wpqt-justify-center wpqt-min-h-[200px]">
      <p className="wpqt-text-base wpqt-text-gray-400 wpqt-font-medium wpqt-m-0">
        {text}
      </p>
    </div>
  );
}

export { NoFilterResults };
