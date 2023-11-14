import { TaskType } from "../../types";
import Task from "./Task";

interface TasksProp {
  tasks: TaskType[];
}
const Tasks = ({ tasks }: TasksProp) => {
  return (
    <div className="flex flex-col gap-5">
      {tasks.map((task, i) => {
        return <Task taskDetails={task} index={i} key={i}/>;
      })}
    </div>
  );
};

export default Tasks;
