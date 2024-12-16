type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const Settings = ({ children, title, description }: Props) => {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-mb-5">
      <h3 className="wpqt-mb-1">{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
};

export { Settings };
