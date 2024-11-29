type Props = {
  text: string;
};
function NotEnoughData({ text }: Props) {
  return (
    <div className="wpqt-flex wpqt-justify-center wpqt-items-center wpqt-h-[400px] wpqt-w-[500px] wpqt-font-semibold">
      {text}
    </div>
  );
}

export { NotEnoughData };
