import { FunnelIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  LogCreatedByEnum,
  LogNumberEnum,
  LogOrderEnum,
  LogsFilterType,
  LogStatusFilterEnum,
  LogTypeEnum,
} from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { PipelinesContext } from "../../../providers/PipelinesContextProvider";
import { WPQTIconButton } from "../../common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTSelect } from "../../common/Select/WPQTSelect";
import { WPQTFilterSection } from "../WPQTFilter";

type Props = {
  filterSettings: LogsFilterType;
  setFilterSettings: (filterSettings: LogsFilterType) => void;
};
const LogsFilter = ({ filterSettings, setFilterSettings }: Props) => {
  const {
    state: { pipelines },
  } = useContext(PipelinesContext);
  const [localFilterSettings, setLocalFilterSettings] =
    useState<LogsFilterType>(filterSettings);

  return (
    <div className="wpqt-mb-6">
      <h3 className="wpqt-mb-3 wpqt-text-center wpqt-text-lg wpqt-font-semibold">
        {__("Logs filtering", "quicktasker")}
      </h3>
      <div className="wpqt-flex wpqt-flex-wrap wpqt-items-end wpqt-justify-center wpqt-gap-3">
        <WPQTFilterSection
          title={__("Search", "quicktasker")}
          labelIdFor="log-search"
        >
          <WPQTInput
            inputId="log-search"
            wrapperClassName="!wpqt-mb-0"
            className="!wpqt-py-1 !wpqt-border !wpqt-border-solid !wpqt-border-qtBorder !wpqt-shadow-none"
            value={localFilterSettings.search}
            onChange={(newValue) => {
              setLocalFilterSettings({
                ...localFilterSettings,
                search: newValue,
              });
            }}
          />
        </WPQTFilterSection>
        <WPQTFilterSection title={__("Type", "quicktasker")}>
          <WPQTSelect
            allSelector={false}
            selectedOptionValue={localFilterSettings.type}
            options={[
              {
                label: __("All types", "quicktasker"),
                value: LogTypeEnum.All,
              },
              {
                label: __("Board", "quicktasker"),
                value: LogTypeEnum.Pipeline,
              },
              {
                label: __("Task", "quicktasker"),
                value: LogTypeEnum.Task,
              },
              {
                label: __("Webhook", "quicktasker"),
                value: LogTypeEnum.Webhook,
              },
              {
                label: __("Automation", "quicktasker"),
                value: LogTypeEnum.Automation,
              },
              {
                label: __("API token", "quicktasker"),
                value: LogTypeEnum.ApiToken,
              },
            ]}
            onSelectionChange={(selection: string) => {
              setLocalFilterSettings({
                ...localFilterSettings,
                type: selection as LogTypeEnum,
                typeId: "",
              });
            }}
          />
        </WPQTFilterSection>

        {localFilterSettings.type === LogTypeEnum.Pipeline && (
          <WPQTFilterSection title={__("Board", "quicktasker")}>
            <WPQTSelect
              allSelector={true}
              selectedOptionValue={localFilterSettings.typeId}
              options={pipelines.map((pipeline) => ({
                label: pipeline.name,
                value: pipeline.id,
              }))}
              onSelectionChange={(selection: string) => {
                setLocalFilterSettings({
                  ...localFilterSettings,
                  typeId: selection,
                });
              }}
            />
          </WPQTFilterSection>
        )}
        <WPQTFilterSection title={__("Created by", "quicktasker")}>
          <WPQTSelect
            allSelector={false}
            selectedOptionValue={localFilterSettings.createdBy}
            options={[
              {
                label: __("Everyone", "quicktasker"),
                value: LogCreatedByEnum.All,
              },
              {
                label: __("Admin", "quicktasker"),
                value: LogCreatedByEnum.Admin,
              },
              {
                label: "QuickTasker",
                value: LogCreatedByEnum.Quicktasker,
              },
              {
                label: __("Automation", "quicktasker"),
                value: LogCreatedByEnum.Automation,
              },
              {
                label: __("Import", "quicktasker"),
                value: LogCreatedByEnum.Import,
              },
              {
                label: __("System", "quicktasker"),
                value: LogCreatedByEnum.System,
              },
              {
                label: __("Anonymous", "quicktasker"),
                value: LogCreatedByEnum.Anonymous,
              },
              {
                label: __("WP user", "quicktasker"),
                value: LogCreatedByEnum.WpUser,
              },
            ]}
            onSelectionChange={(selection: string) => {
              setLocalFilterSettings({
                ...localFilterSettings,
                createdBy: selection as LogCreatedByEnum,
              });
            }}
          />
        </WPQTFilterSection>

        <WPQTFilterSection title={__("Number of logs", "quicktasker")}>
          <WPQTSelect
            allSelector={false}
            selectedOptionValue={localFilterSettings.numberOfLogs}
            options={[
              {
                label: __("Show 100", "quicktasker"),
                value: LogNumberEnum.Hundred,
              },
              {
                label: __("Show 200", "quicktasker"),
                value: LogNumberEnum.TwoHundred,
              },
              {
                label: "Show 500",
                value: LogNumberEnum.FiveHundred,
              },
              {
                label: "Show all",
                value: LogNumberEnum.All,
              },
            ]}
            onSelectionChange={(selection: string) => {
              setLocalFilterSettings({
                ...localFilterSettings,
                numberOfLogs: selection as LogCreatedByEnum,
              });
            }}
          />
        </WPQTFilterSection>

        <WPQTFilterSection title={__("Order", "quicktasker")}>
          <WPQTSelect
            allSelector={false}
            selectedOptionValue={localFilterSettings.order}
            options={[
              {
                label: __("Ascending", "quicktasker"),
                value: LogOrderEnum.Asc,
              },
              {
                label: __("Descending", "quicktasker"),
                value: LogOrderEnum.Desc,
              },
            ]}
            onSelectionChange={(selection: string) => {
              setLocalFilterSettings({
                ...localFilterSettings,
                order: selection as LogOrderEnum,
              });
            }}
          />
        </WPQTFilterSection>

        <WPQTFilterSection title={__("Status", "quicktasker")}>
          <WPQTSelect
            allSelector={false}
            selectedOptionValue={localFilterSettings.status}
            options={[
              {
                label: __("All", "quicktasker"),
                value: LogStatusFilterEnum.All,
              },
              {
                label: __("Success", "quicktasker"),
                value: LogStatusFilterEnum.Success,
              },
              {
                label: __("Error", "quicktasker"),
                value: LogStatusFilterEnum.Error,
              },
            ]}
            onSelectionChange={(selection: string) => {
              setLocalFilterSettings({
                ...localFilterSettings,
                status: selection,
              });
            }}
          />
        </WPQTFilterSection>
        <WPQTIconButton
          text={__("Apply filter", "quicktasker")}
          icon={<FunnelIcon className="wpqt-size-5 wpqt-icon-blue" />}
          onClick={() => setFilterSettings(localFilterSettings)}
        />
      </div>
    </div>
  );
};

export { LogsFilter };
