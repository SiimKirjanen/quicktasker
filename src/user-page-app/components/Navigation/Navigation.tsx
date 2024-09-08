import { useNavigate } from "react-router-dom";

type Props = {
  loading: boolean;
  onRefresh?: () => void;
};
function NavigationBar({ loading, onRefresh = () => {} }: Props) {
  const navigate = useNavigate();

  return (
    <div className="wpqt-h-[60px]">
      <div onClick={() => navigate("/")}>Home</div>
    </div>
  );
}

export { NavigationBar };
