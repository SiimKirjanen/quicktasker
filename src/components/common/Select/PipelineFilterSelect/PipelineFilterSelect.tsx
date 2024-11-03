import { useContext, useMemo } from "@wordpress/element";
import { PipelinesContext } from "../../../../providers/PipelinesContextProvider";
import { Option, WPQTSelect } from "../WPQTSelect";

type Props = {
  selectedOptionValue: string;
  selectionChange: (selection: string) => void;
  extraOptions?: Option[];
};
function PipelineFilterSelect({
  selectedOptionValue,
  selectionChange,
  extraOptions = [],
}: Props) {
  const {
    state: { pipelines },
  } = useContext(PipelinesContext);

  const pipelineOptions = useMemo(
    () =>
      pipelines.map((pipeline) => ({
        value: pipeline.id,
        label: pipeline.name,
      })),
    [pipelines],
  );

  return (
    <WPQTSelect
      options={[...pipelineOptions, ...extraOptions]}
      selectedOptionValue={selectedOptionValue}
      onSelectionChange={selectionChange}
    />
  );
}

export { PipelineFilterSelect };
