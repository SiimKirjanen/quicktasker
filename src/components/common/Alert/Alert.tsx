const alertTypeClasses: { [key in NonNullable<Props["type"]>]: string } = {
  success: "wpqt-bg-green-100 wpqt-border-green-400 wpqt-text-green-700",
  error: "wpqt-bg-red-100 wpqt-border-red-400 wpqt-text-red-700",
  warning: "wpqt-bg-yellow-100 wpqt-border-yellow-400 wpqt-text-yellow-700",
  info: "wpqt-bg-blue-100 wpqt-border-blue-400 wpqt-text-blue-700",
  primary: "wpqt-bg-gray-100 wpqt-border-gray-400 wpqt-text-gray-700",
};

type Props = {
  children: React.ReactNode;
  type?: "success" | "error" | "warning" | "info" | "primary";
  className?: string;
};
function Alert({ type = "primary", className = "", children }: Props) {
  const typeClasses = alertTypeClasses[type];

  return (
    <div
      className={`wpqt-inline-flex wpqt-p-2 wpqt-border wpqt-border-solid wpqt-rounded-md ${typeClasses} ${className}`}
    >
      {children}
    </div>
  );
}

export { Alert };
