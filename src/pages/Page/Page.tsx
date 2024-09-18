type Props = {
  children: React.ReactNode;
};

function Page({ children }: Props) {
  return <div className="wpqt-pr-4">{children}</div>;
}

export { Page };
