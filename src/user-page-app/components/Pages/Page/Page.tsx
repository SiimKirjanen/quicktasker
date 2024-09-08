import { NavigationBar } from "../../Navigation/Navigation";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  onRefresh?: () => void;
};

function PageWrap({ children, loading = false, onRefresh }: Props) {
  return (
    <div className="wpqt-flex wpqt-flex-col">
      <div className="wpqt-user-app-content-height wpqt-order-1 wpqt-overflow-y-auto lg:wpqt-order-2">
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

export { PageWrap, PageContentWrap };
