import { useContext, useEffect, useState } from "@wordpress/element";
import { Task } from "../../../../types/task";
import { PageContentWrap, PageWrap } from "../Page/Page";
import {
  assignTaskToUser,
  changeTaskStageRequest,
  getTaskDataRequest,
  unAssignTaskFromUser,
} from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { useParams } from "react-router-dom";
import { convertTaskFromServer } from "../../../../utils/task";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { WPQTButton } from "../../../../components/common/Button/Button";
import {
  WPQTSelect,
  Option,
} from "../../../../components/common/Select/WPQTSelect";

function TaskPage() {
  const {
    state: { pageHash, userId },
  } = useContext(UserPageAppContext);

  const { taskHash } = useParams<{ taskHash: string }>();
  const [task, setTask] = useState<null | Task>(null);
  const [stageOptions, setStageOptions] = useState<null | Option[]>(null);
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandler();
  const isAssignedToTask = task?.assigned_users.some(
    (user) => user.id === userId,
  );

  useEffect(() => {
    getUserPageTask();
  }, [taskHash]);

  const getUserPageTask = async () => {
    try {
      setLoading(true);
      const response = await getTaskDataRequest(pageHash, taskHash!);
      const options = response.data.stages.map((stage) => {
        return {
          label: stage.name,
          value: stage.id,
        };
      });

      setTask(convertTaskFromServer(response.data.task));
      setStageOptions(options);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const assignTask = async () => {
    try {
      const response = await assignTaskToUser(pageHash, taskHash!);

      setTask(convertTaskFromServer(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  const unAssignTask = async () => {
    try {
      const response = await unAssignTaskFromUser(pageHash, taskHash!);

      setTask(convertTaskFromServer(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  const changeTaskStage = async (stageId: string) => {
    try {
      setLoading(true);
      const response = await changeTaskStageRequest(
        pageHash,
        taskHash!,
        stageId,
      );
      const options = response.data.stages.map((stage) => {
        return {
          label: stage.name,
          value: stage.id,
        };
      });

      setTask(convertTaskFromServer(response.data.task));
      setStageOptions(options);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap loading={loading} onRefresh={getUserPageTask}>
      <PageContentWrap>
        {task && (
          <div>
            {JSON.stringify(task)}
            {isAssignedToTask && (
              <WPQTButton onClick={unAssignTask} btnText="Unassign from task" />
            )}
            {!isAssignedToTask && (
              <WPQTButton onClick={assignTask} btnText="Assign task" />
            )}

            {stageOptions && (
              <>
                <WPQTSelect
                  options={stageOptions}
                  onSelectionChange={changeTaskStage}
                  selectedOptionValue={task.stage_id}
                  allSelector={false}
                />
              </>
            )}
          </div>
        )}
      </PageContentWrap>
    </PageWrap>
  );
}

export { TaskPage };
