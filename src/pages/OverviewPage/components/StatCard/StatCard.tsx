type Props = {
  label: string;
  value: number;
  colorClass: string;
};

function StatCard({ label, value, colorClass }: Props) {
  return (
    <div
      className={`wpqt-rounded-lg wpqt-p-6 wpqt-shadow wpqt-text-white wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-2 wpqt-min-w-[160px] ${colorClass}`}
    >
      <span
        className="wpqt-text-4xl wpqt-font-bold"
        data-testid="stat-card-value"
      >
        {value}
      </span>
      <span className="wpqt-text-sm wpqt-font-medium wpqt-text-center">
        {label}
      </span>
    </div>
  );
}

export { StatCard };
