type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const Settings = ({ children, title, description }: Props) => {
  return (
    <div className="wpqt-mb-5">
      <h4 className="wpqt-m-0 wpqt-mb-1">{title}</h4>
      <p className="wpqt-mt-0">{description}</p>
      {children}
    </div>
  );
};

export { Settings };
