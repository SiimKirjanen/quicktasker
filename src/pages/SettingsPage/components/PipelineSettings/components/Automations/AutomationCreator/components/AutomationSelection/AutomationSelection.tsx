type Props = {
  children: React.ReactNode;
  title: string;
};
function AutomationSelection({ children, title }: Props) {
  return (
    <div className="wpqt-mb-2">
      <div className="wpqt-font-semibold wpqt-text-base wpqt-mb-4 wpqt-text-center">
        {title}
      </div>
      <div className="wpqt-flex wpqt-justify-center wpqt-gap-3">{children}</div>
    </div>
  );
}

export { AutomationSelection };
