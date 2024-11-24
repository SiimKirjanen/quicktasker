type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const Settings = ({ children, title, description }: Props) => {
  return (
    <div className="wpqt-mb-3">
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
};

export { Settings };
