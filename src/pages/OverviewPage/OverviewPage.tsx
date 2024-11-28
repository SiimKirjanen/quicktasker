import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { WPQTTabs } from "../../components/Tab/WPQTTabs";
import { PipelinesContext } from "../../providers/PipelinesContextProvider";
import { Page } from "../Page/Page";
import { PipelineOverview } from "./components/PipelineOverview/PipelineOverview";

function OverviewPage() {
  const {
    state: { pipelines },
  } = useContext(PipelinesContext);
  const pipelineNames = pipelines.map((pipeline) => pipeline.name);
  const tabContent = pipelines.map((pipeline) => {
    return <PipelineOverview key={pipeline.id} pipeline={pipeline} />;
  });

  return (
    <Page>
      <WPQTPageHeader
        description={__("This is the overview page.", "quicktasker")}
      >
        {__("Overview", "quicktasker")}
      </WPQTPageHeader>
      <WPQTTabs tabs={pipelineNames} tabsContent={tabContent} />
    </Page>
  );
}

export { OverviewPage };
