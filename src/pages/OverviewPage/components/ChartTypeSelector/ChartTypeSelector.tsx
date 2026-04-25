import { __ } from "@wordpress/i18n";
import { TbChartBar, TbChartHistogram, TbChartPie } from "react-icons/tb";

type OverviewChartType = "PieChart" | "BarChart" | "ColumnChart";

const chartTypeOptions: {
  label: string;
  value: OverviewChartType;
  icon: React.ReactNode;
}[] = [
  {
    label: __("Pie", "quicktasker"),
    value: "PieChart",
    icon: <TbChartPie size={16} />,
  },
  {
    label: __("Bar", "quicktasker"),
    value: "BarChart",
    icon: <TbChartBar size={16} />,
  },
  {
    label: __("Column", "quicktasker"),
    value: "ColumnChart",
    icon: <TbChartHistogram size={16} />,
  },
];

type Props = {
  value: OverviewChartType;
  onChange: (type: OverviewChartType) => void;
};

function ChartTypeSelector({ value, onChange }: Props) {
  return (
    <div className="wpqt-flex wpqt-gap-1 wpqt-justify-center wpqt-mb-2">
      {chartTypeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          title={option.label}
          className={`wpqt-flex wpqt-items-center wpqt-gap-1 wpqt-px-3 wpqt-py-1 wpqt-text-sm wpqt-rounded wpqt-border wpqt-transition-colors ${
            value === option.value
              ? "wpqt-bg-blue-500 wpqt-text-white wpqt-border-blue-500"
              : "wpqt-bg-white wpqt-text-gray-600 wpqt-border-gray-300 hover:wpqt-bg-gray-50"
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

export { ChartTypeSelector };
export type { OverviewChartType };
