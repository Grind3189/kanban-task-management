import { TaskType } from "../../../types";
import { useDispatch } from "react-redux";
import { updateSubtasks } from "../../../redux/boardSlice";
import Subtask from "./Subtask";

interface SubtasksListProp {
  taskDetails: TaskType;
  boardIndex: number;
}

const SubtasksList = ({ taskDetails, boardIndex }: SubtasksListProp) => {
  const notCompletedSubTask = taskDetails.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;
  const today = new Date();
  const dispatch = useDispatch();
  const modifiedSubtasks = taskDetails.subtasks.map(subtask => ({...subtask, id: today.getTime() + subtask.title}))

  const handleSubtaskCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedSubtasks = modifiedSubtasks.map(subtask => {
      if(subtask.id === e.currentTarget.dataset.title) {
        return {
          title: subtask.title,
          isCompleted: !subtask.isCompleted
        }
      } else {
        const {id, ...otherData} = subtask
        return {...otherData}
      } 
    })


    dispatch(
      updateSubtasks({
        updatedSubtasks,
        boardIndex,
        taskId: taskDetails._id,
        columnStatus: taskDetails.status,
      }),
    );
  };


  return (
    <div className="flex flex-col gap-4">
      <span className="text-[0.75rem] font-bold text-medium-grey-#828FA3 dark:text-white">
        Subtasks ({notCompletedSubTask} of {taskDetails.subtasks.length})
      </span>
      <div className="flex flex-col gap-2">
        {modifiedSubtasks.map((subtask, i) => {
          return (
            <Subtask
              subTaskDetails={subtask}
              key={i}
              handleSubtaskCheck={handleSubtaskCheck}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SubtasksList;
