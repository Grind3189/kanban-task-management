import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useSearchParams } from "react-router-dom";
import { BoardType } from "../types";
import Boards from "../components/boards/Boards";
import TaskModal from "../components/taskModal/TaskModal";
import ModalBackdrop from "../components/shared/ModalBackdrop";
import AddTask from "../components/addTask/AddTask";
import AddBoard from "../components/boards/AddBoard";

function Home() {
  const [searchParams] = useSearchParams();
  const { boards } = useSelector((state: RootState) => state.boards);
  const taskId = searchParams.get("viewTask") || "";
  const boardId = searchParams.get("board")
    ? searchParams.get("board")
    : boards[0]._id;
  const filteredBoard: BoardType = boards.filter(
    (board: BoardType) => board._id === boardId,
  )[0];
  const listOfStatus = filteredBoard.columns.map((column) => column.name);
  const filteredTask = filteredBoard.columns
    .map((column) => {
      return column.tasks.filter((task) => task._id === taskId);
    })
    .flat()[0];

  const addTask = searchParams.get("addTask");
  const editTask = searchParams.get("editTask");
  const addBoard = searchParams.get("addBoard");
  const editBoard = searchParams.get("editBoard");

  return (
    <div>
      <Boards boardDetails={filteredBoard} />

      {taskId && (
        <>
          <ModalBackdrop>
            <TaskModal
              taskDetails={filteredTask}
              listOfStatus={listOfStatus}
              boardId={boardId}
            />
          </ModalBackdrop>
        </>
      )}

      {addBoard && !editBoard && (
        <ModalBackdrop>
          <AddBoard editBoard={false} />
        </ModalBackdrop>
      )}

      {editBoard && !addBoard && (
        <ModalBackdrop>
          <AddBoard editBoard={true} filteredBoard={filteredBoard} />
        </ModalBackdrop>
      )}

      {addTask && !editTask && (
        <>
          <ModalBackdrop>
            <AddTask
              listOfStatus={listOfStatus}
              boardId={boardId}
              editTask={false}
            />
          </ModalBackdrop>
        </>
      )}

      {editTask && !addTask && (
        <>
          <ModalBackdrop>
            <AddTask
              listOfStatus={listOfStatus}
              boardId={boardId}
              editTask={true}
              filteredBoard={filteredBoard}
              editTaskId={editTask}
            />
          </ModalBackdrop>
        </>
      )}
    </div>
  );
}

export default Home;
