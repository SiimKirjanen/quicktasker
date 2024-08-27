import { useEffect } from "@wordpress/element";
type Props = {
  taskId: string;
};

function CommentsTabContent({ taskId }: Props) {
  useEffect(() => {
    console.log("CommentsTabContent");
  }, []);
  return <div>Comments</div>;
}

export { CommentsTabContent };
