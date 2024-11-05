type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const Settings = ({ children, title, description }: Props) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
};

export { Settings };
