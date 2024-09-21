import { WPQTFilter } from "../WPQTFilter";
import { WPQTInput } from "../../common/Input/Input";

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};
function UserTasksFilter({ value, onValueChange }: Props) {
  return (
    <WPQTFilter title="User tasks filtering">
      <WPQTInput value={value} onChange={onValueChange} />
    </WPQTFilter>
  );
}

export { UserTasksFilter };
