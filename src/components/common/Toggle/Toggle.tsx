import Switch from "react-switch";

type Props = {
  checked: boolean;
  handleChange: (checked: boolean) => void;
  id?: string;
  dataTestId?: string;
};
function Toggle({ checked, handleChange, id, dataTestId = undefined }: Props) {
  return (
    <Switch
      onChange={handleChange}
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      height={20}
      width={44}
      id={id}
      data-testid={dataTestId}
    />
  );
}

export { Toggle };
