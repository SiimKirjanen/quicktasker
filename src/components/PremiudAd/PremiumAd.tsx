import { __ } from "@wordpress/i18n";

type Props = {
  title: string;
  description: string;
  className?: string;
};
function PremiumAd({ title, description, className = "" }: Props) {
  return (
    <div
      className={`wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center wpqt-h-full ${className}`}
    >
      <h2 className="wpqt-font-semibold">{title}</h2>
      <div className="wpqt-text-center wpqt-mb-4">{description}</div>
      <div className="wpqt-text-blue-500 wpqt-font-semibold">
        <a href="https://payhip.com/b/84TLC" target="_blank" rel="noreferrer">
          {__("Get the premium version", "quicktasker")}
        </a>
      </div>
    </div>
  );
}

export { PremiumAd };
