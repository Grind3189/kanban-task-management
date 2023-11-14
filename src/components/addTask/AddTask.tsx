import { useEffect, useState } from "react";
import { BoardType, TaskType } from "../../types";
import { nanoid } from "nanoid";
import { addNewTask } from "../../redux/boardSlice";
import AddSubtask from "./AddSubtask";
import PickStatus from "./PickStatus";
import { useDispatch } from "react-redux";
import FormInput from "../shared/form/FormInput";
import PurpleButton from "../shared/form/PurpleButton";
import { useLocation, useNavigate } from "react-router-dom";

interface AddTaskProp {
  listOfStatus: string[];
  boardId: string | null;
  editTask: boolean;
  filteredBoard?: BoardType;
  editTaskId?: string;
}
interface SubtasksInputType {
  title: string;
  isCompleted: boolean;
  id: string;
  hasError: boolean;
}

const AddTask = ({
  listOfStatus,
  boardId,
  editTask,
  filteredBoard,
  editTaskId,
}: AddTaskProp) => {
  const filteredTask = filteredBoard?.columns
    .map((column) => {
      return column.tasks.filter((task) => task._id === editTaskId);
    })
    .flat()[0];

  const [newTask, setNewTask] = useState<TaskType>(
    editTask && filteredTask
      ? filteredTask
      : {
          title: "",
          description: "",
          status: "",
          _id: nanoid(),
          subtasks: [],
        },
  );
  const [subtasksInput, setSubtasksInput] = useState<SubtasksInputType[]>(
    editTask && filteredTask
      ? filteredTask.subtasks.map((subtask) => {
          return {
            ...subtask,
            id: nanoid(),
            hasError: false,
          };
        })
      : [
          {
            title: "",
            isCompleted: false,
            id: nanoid(),
            hasError: false,
          },
          {
            title: "",
            isCompleted: false,
            id: nanoid(),
            hasError: false,
          },
        ],
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updatedSubtasks = subtasksInput.map((subtask) => ({
      title: subtask.title,
      isCompleted: subtask.isCompleted,
    }));
    setNewTask((prev) => ({ ...prev, subtasks: updatedSubtasks }));
  }, [subtasksInput]);

  const handleChangeTaskDetails = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewTask((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleValidate = () => {
    let subtasksHasError: boolean = false;

    const updatedSubtasks = subtasksInput.map((subtask) => {
      if (!subtask.title) {
        subtasksHasError = true;
        return {
          ...subtask,
          hasError: true,
        };
      } else return subtask;
    });

    setSubtasksInput(updatedSubtasks)

    if (!subtasksHasError) {
      dispatch(addNewTask({ newTask, boardId, editTask }));
      navigate(location.state.prevPath)
    }
  };

  return (
    <form className="flex w-[343px] flex-col gap-6 rounded-md bg-white p-6 dark:bg-dark-grey-#2B2C37 md:w-[480px] h-[500px] overflow-y-auto md:h-auto">
      <h1 className="text-[1.125rem] font-bold dark:text-white">
        {editTask ? "Edit Task" : "Add New Task"}
      </h1>

      <div className="flex flex-col gap-2">
        <label className="text-[0.75rem] font-bold text-medium-grey-#828FA3 dark:text-white">
          Title
        </label>
        <FormInput
          value={newTask.title}
          handleChange={handleChangeTaskDetails}
          name="title"
          placeholder="e.g. Take coffee break"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[0.75rem] font-bold text-medium-grey-#828FA3 dark:text-white">
          Description
        </label>
        <textarea
          className="h-[112px] resize-none rounded-inputs border border-[#828FA340] px-4 py-2 text-[0.8125rem] font-medium outline-none focus:border-purple-#635FC7 dark:bg-dark-grey-#2B2C37 dark:text-white"
          placeholder="e.g. It’s always good to take a break.This 15 minute break will  recharge the batteries a little."
          name="description"
          onChange={handleChangeTaskDetails}
          value={newTask.description}
        />
      </div>

      <AddSubtask
        subtasksInput={subtasksInput}
        setSubtasksInput={setSubtasksInput}
      />
      <PickStatus listOfStatus={listOfStatus} setNewTask={setNewTask} />
      <PurpleButton handleClick={handleValidate}>
        {editTask ? "Save Changes" : "Create Task"}
      </PurpleButton>
    </form>
  );
};

export default AddTask;
