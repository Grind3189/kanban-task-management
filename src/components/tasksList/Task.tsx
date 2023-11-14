import { Link } from "react-router-dom";
import { TaskType } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import { genNewSeachParams } from "../../utils/utils";
interface TaskProp {
  taskDetails: TaskType;
  index: number;
}
const Task = ({ taskDetails, index }: TaskProp) => {
  const notCompleted = taskDetails.subtasks.filter(
    (subtask) => subtask.isCompleted === true,
  ).length;
  
 
  return (
    <Draggable key={taskDetails.title} draggableId={taskDetails._id} index={index}>
      {(provided) => (
        <Link to={genNewSeachParams("viewTask", taskDetails._id )} className="rounded-lg bg-white px-4 py-[1.4375rem] dark:bg-dark-grey-#2B2C37" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <h1 className="text-[15px] font-bold text-black-#000112 dark:text-white cursor-pointer">
            {taskDetails.title}
          </h1>
          <span className="text-[12px] font-bold text-medium-grey-#828FA3 cursor-pointer">
            {notCompleted} of {taskDetails.subtasks.length} subtasks
          </span>
        </Link>
      )}
    </Draggable>
  );
};
export default Task;
