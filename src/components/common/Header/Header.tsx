type WPQTPageHeaderProps = {
  children: React.ReactNode;
  description?: string | null;
};
function WPQTPageHeader({ children, description = null }: WPQTPageHeaderProps) {
  return (
    <div className="wpqt-mb-6">
      <h1>{children}</h1>
      {description && <div>{description}</div>}
    </div>
  );
}

export { WPQTPageHeader };
