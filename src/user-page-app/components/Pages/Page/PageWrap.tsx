type Props = {
  children: React.ReactNode;
};

function PageWrap({ children }: Props) {
  return (
    <div className="wpqt-mx-auto wpqt-w-full wpqt-max-w-5xl wpqt-p-4">
      {children}
    </div>
  );
}

export { PageWrap };
