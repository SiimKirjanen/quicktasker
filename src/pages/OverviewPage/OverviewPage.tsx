import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { Info } from "../../components/Info/Info";
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
      {tabContent ? (
        <>
          <WPQTPageHeader
            description={__("Get overview of the tasks.", "quicktasker")}
          >
            {__("Overview", "quicktasker")}
          </WPQTPageHeader>
          <WPQTTabs
            tabs={pipelineNames}
            tabsContent={tabContent}
            tabListClassName="wpqt-gap-5"
            tabClassName="wpqt-flex-none"
          />
        </>
      ) : (
        <Info
          infoTitle={__("No overview to display", "quicktasker")}
          infoDescription={__(
            "You need to first create a board to see the overview.",
            "quicktasker",
          )}
        />
      )}
    </Page>
  );
}

export { OverviewPage };
