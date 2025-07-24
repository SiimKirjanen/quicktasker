import { WPQTInput } from "../../../../components/common/Input/Input";

type Props = {
  title: string;
  searchValue: string;
  onSearchChange?: (value: string) => void;
};

function TaskFilter({ title, searchValue, onSearchChange = () => {} }: Props) {
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-1 wpqt-mb-3">
      <div>{title}</div>
      <WPQTInput value={searchValue} onChange={onSearchChange} />
    </div>
  );
}

export { TaskFilter };
