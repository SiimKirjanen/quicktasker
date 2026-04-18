import { FaWordpressSimple } from "react-icons/fa";

type WordPressIconProps = {
  size?: number;
};
function WordPressIcon({ size = 24 }: WordPressIconProps) {
  return <FaWordpressSimple size={size} data-testid="wordpress-icon" />;
}

export { WordPressIcon };
