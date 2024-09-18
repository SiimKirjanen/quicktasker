import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

type Props = {
  tabs: string[];
  tabsContent: React.ReactNode[];
};
function WPQTTabs({ tabs, tabsContent }: Props) {
  return (
    <TabGroup>
      <TabList className="wpqt-mb-3 wpqt-flex">
        {tabs.map((tab) => (
          <WPQTTab key={tab}>{tab}</WPQTTab>
        ))}
      </TabList>
      <TabPanels>
        {tabsContent.map((tabContent, index) => (
          <WPQTTabPanel key={index}>{tabContent}</WPQTTabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}

function WPQTTab({ children }: { children: React.ReactNode }) {
  return (
    <Tab
      as="div"
      className="wpqt-flex-1 wpqt-cursor-pointer wpqt-p-1 wpqt-text-center data-[selected]:wpqt-border-b-2 data-[selected]:wpqt-border-l-0 data-[selected]:wpqt-border-r-0 data-[selected]:wpqt-border-t-0 data-[selected]:wpqt-border-solid data-[selected]:wpqt-border-b-blue-500"
    >
      {children}
    </Tab>
  );
}

function WPQTTabPanel({ children }: { children: React.ReactNode }) {
  return <TabPanel>{children}</TabPanel>;
}

export { WPQTTabs };
