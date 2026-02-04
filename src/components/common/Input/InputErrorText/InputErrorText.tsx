type InputErrorProps = {
  errorText?: string;
};

function InputErrorText({ errorText }: InputErrorProps) {
  if (!errorText) {
    return null;
  }

  return <div className="wpqt-text-qtTextRed wpqt-mt-1">{errorText}</div>;
}

export { InputErrorText };
