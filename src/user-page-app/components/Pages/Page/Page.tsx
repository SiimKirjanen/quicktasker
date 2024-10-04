import { NavigationBar } from "../../Navigation/Navigation";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  onRefresh?: () => void;
  className?: string;
};

function PageWrap({ children, loading = false, onRefresh, className }: Props) {
  return (
    <div className="wpqt-flex wpqt-flex-col">
      <div
        className={`wpqt-user-app-content-height wpqt-order-1 wpqt-overflow-y-auto lg:wpqt-order-2 ${className}`}
      >
        {children}
      </div>
      <div className="wpqt-order-2 lg:wpqt-order-1">
        <NavigationBar loading={loading} onRefresh={onRefresh} />
      </div>
    </div>
  );
}

function PageContentWrap({ children }: Props) {
  return <div className="wpqt-p-4">{children}</div>;
}

type PageScreenMiddleProps = {
  children: React.ReactNode;
};
function PageScreenMiddle({ children }: PageScreenMiddleProps) {
  return (
    <div className="wpqt-flex wpqt-h-screen wpqt-flex-col wpqt-items-center wpqt-justify-center">
      {children}
    </div>
  );
}

export { PageWrap, PageContentWrap, PageScreenMiddle };
