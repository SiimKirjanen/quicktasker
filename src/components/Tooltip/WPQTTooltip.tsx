import { Tooltip } from "react-tooltip";

type Props = {
  id: string;
  style?: React.CSSProperties;
};

const defaultStyle: React.CSSProperties = {
  background: "#2b74da", // custom blue background
  color: "#fff", // white text
  borderRadius: "4px",
  padding: "8px 12px",
  fontSize: "14px",
  border: "1px solid #1e40af", // blue-800 border for contrast
  opacity: 1,
};

function WPQTTooltip({ id, style }: Props) {
  return (
    <Tooltip id={id} style={{ ...defaultStyle, ...style }}>
      <span>Tooltip content</span>
    </Tooltip>
  );
}

export { WPQTTooltip };
