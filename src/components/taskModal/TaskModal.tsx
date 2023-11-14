import { TaskType } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { genNewSeachParams, getBoardIndex } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/boardSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import ModalContainer from "../shared/ModalContainer";
import StatusListBox from "./StatusListBox";
import SubtasksList from "./subtask/SubtasksList";
import ModifyTask from "./ModifyTask";
import DeleteModal from "../shared/DeleteModal";

interface TaskModalProp {
  taskDetails: TaskType;
  listOfStatus: string[];
  boardId: string | null;
}

const TaskModal = ({ taskDetails, listOfStatus, boardId }: TaskModalProp) => {
  const [showDeleteTaskModal, setShowDeleteTaskModal] =
    useState<boolean>(false);
  const data = useSelector((state: RootState) => state.boards);
  const currentBoardIndex = getBoardIndex(boardId, data.boards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const editTaskUrl = genNewSeachParams("editTask", taskDetails._id)

  const handleDeleteTask = () => {
    navigate(boardId ? `?board=${boardId}` : "/");
    dispatch(
      deleteTask({
        taskId: taskDetails._id,
        boardIndex: currentBoardIndex,
        status: taskDetails.status,
      }),
    );
  };

  const handleEditTask = () => {
    navigate(editTaskUrl, {state: {prevPath: location.search }});
  };

  const handleShowDeleteTask = () => {
    setShowDeleteTaskModal((prev) => !prev);
  };

  return (
    <>
      {showDeleteTaskModal ? (
        <>
          <div
            className="fixed left-0 top-0 -z-10 flex h-full w-full items-center justify-center bg-black/50"
            onClick={handleShowDeleteTask}
          ></div>
          <DeleteModal
            handleCancel={handleShowDeleteTask}
            handleDelete={handleDeleteTask}
            title="Delete this task?"
            description={`Are you sure you want to delete the ‘${taskDetails.title}’ board? This action
            will remove all columns and tasks and cannot be reversed.`}
          />
        </>
      ) : (
        <ModalContainer>
          <div className="flex items-center justify-between">
            <h1 className="text-[1.125rem] font-bold dark:text-white">
              {taskDetails.title}
            </h1>
            <ModifyTask
              handleShowDeleteTask={handleShowDeleteTask}
              handleEditTask={handleEditTask}
            />
          </div>

          {taskDetails.description && (
            <p className="text-[0.8125rem] font-medium leading-[23px] text-medium-grey-#828FA3">
              {taskDetails.description}
            </p>
          )}

          <SubtasksList
            taskDetails={taskDetails}
            boardIndex={currentBoardIndex}
          />

          <StatusListBox
            listOfStatus={listOfStatus}
            taskDetails={taskDetails}
            boardIndex={currentBoardIndex}
          />
        </ModalContainer>
      )}
    </>
  );
};

export default TaskModal;
