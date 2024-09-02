type Props = {
  children: React.ReactNode;
};

function PageWrap({ children }: Props) {
  return <div>{children}</div>;
}

export { PageWrap };
