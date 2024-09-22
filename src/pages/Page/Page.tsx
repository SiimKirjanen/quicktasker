import { useContext } from "@wordpress/element";
import { LoadingContext } from "../../providers/LoadingContextProvider";
import { FullLoading } from "../../components/Loading/Loading";

type Props = {
  children: React.ReactNode;
};

function Page({ children }: Props) {
  const {
    state: { fullPageLoading },
  } = useContext(LoadingContext);
  return (
    <div className="wpqt-pr-4">
      {fullPageLoading ? <FullLoading /> : children}
    </div>
  );
}

export { Page };
