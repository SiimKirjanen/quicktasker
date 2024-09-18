type WPQTPageHeaderProps = {
  children: React.ReactNode;
  description?: string | null;
};
function WPQTPageHeader({ children, description = null }: WPQTPageHeaderProps) {
  return (
    <div>
      <h1>{children}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

export { WPQTPageHeader };
