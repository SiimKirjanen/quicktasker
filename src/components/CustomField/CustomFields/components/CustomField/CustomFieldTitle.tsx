type Props = {
  name: string;
  description: string | null;
};
function CustomFieldTitle({ name, description = "" }: Props) {
  return (
    <>
      <div className="wpqt-mb-1 wpqt-text-base wpqt-font-semibold">{name}</div>
      {description && (
        <div className="wpqt-mb-2 wpqt-italic">{description}</div>
      )}
    </>
  );
}

export { CustomFieldTitle };
