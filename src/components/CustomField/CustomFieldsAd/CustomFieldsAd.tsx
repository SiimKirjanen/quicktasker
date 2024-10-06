type Props = {
  title: string;
  description: string;
};
function CustomFieldsAd({ title, description }: Props) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export { CustomFieldsAd };
