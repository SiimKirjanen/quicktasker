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
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTSelect } from "../../common/Select/WPQTSelect";
import { WPQTFilter, WPQTFilterSection } from "../WPQTFilter";

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

  const logSearch = (
    <WPQTFilterSection
      title={__("Search", "quicktasker")}
      labelIdFor="log-search"
    >
      <WPQTInput
        inputId="log-search"
        value={localFilterSettings.search}
        onChange={(newValue) => {
          setLocalFilterSettings({
            ...localFilterSettings,
            search: newValue,
          });
        }}
      />
    </WPQTFilterSection>
  );

  const applySearch = (
    <WPQTIconButton
      text={__("Apply filter", "quicktasker")}
      icon={<FunnelIcon className="wpqt-size-5 wpqt-icon-blue" />}
      onClick={() => setFilterSettings(localFilterSettings)}
    />
  );

  return (
    <WPQTFilter
      title={__("Logs filtering", "quicktasker")}
      searchChildren={logSearch}
      applyFilterChildren={applySearch}
    >
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
    </WPQTFilter>
  );
};

export { LogsFilter };
