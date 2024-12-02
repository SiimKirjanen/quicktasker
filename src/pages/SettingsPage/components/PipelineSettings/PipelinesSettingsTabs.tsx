import { useContext } from "@wordpress/element";
import { WPQTTabs } from "../../../../components/Tab/WPQTTabs";
import { PipelinesContext } from "../../../../providers/PipelinesContextProvider";
import { PipelineSettings } from "./components/PipelineSettings/PipelineSettings";

function PipelinesSettingsTabs() {
  const {
    state: { pipelines },
  } = useContext(PipelinesContext);
  const pipelineNames = pipelines.map((pipeline) => pipeline.name);
  const tabContent = pipelines.map((pipeline) => {
    return <PipelineSettings key={pipeline.id} pipeline={pipeline} />;
  });

  return (
    <div>
      <WPQTTabs
        tabs={pipelineNames}
        tabsContent={tabContent}
        tabListClassName="wpqt-gap-5"
        tabClassName="wpqt-flex-none"
      />
    </div>
  );
}

export { PipelinesSettingsTabs };
