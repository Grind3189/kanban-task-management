import { BoardType, ColumnType } from "../../types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { updateTasks, updateColumn } from "../../redux/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { genNewSeachParams, getBoardIndex } from "../../utils/utils";
import Column from "./Column";
import { Link } from "react-router-dom";

interface BoardProp {
  boardDetails: BoardType;
}

interface DroppableType {
  index: number;
  droppableId: string;
}

const Board = ({ boardDetails }: BoardProp) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.boards);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const boardIndex: number = getBoardIndex(boardDetails._id, data.boards);
    // dropped outside the list
    if (!destination) {
      return;
    };

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    //if dropped on the same column
    if (sInd === dInd) {
      const items = reorder(
        boardDetails.columns[sInd],
        source.index,
        destination.index,
      );
      dispatch(
        updateTasks({
          updatedData: items,
          columnIndex: sInd,
          boardIndex: boardIndex,
        }),
      );
    } else {
      const result = move(
        boardDetails.columns[sInd],
        boardDetails.columns[dInd],
        source,
        destination,
      );
      const tempState = [...boardDetails.columns];
      tempState[sInd] = { ...tempState[sInd], tasks: result[sInd] };
      tempState[dInd] = { ...tempState[dInd], tasks: result[dInd] };
      dispatch(updateColumn({ boardIndex, updatedColumns: tempState }));
    }
  };

  //Move to another column
  const move = (
    source: ColumnType,
    destination: ColumnType,
    droppableSource: DroppableType,
    droppableDestination: DroppableType,
  ) => {
    const sourceClone = Array.from(source.tasks);
    const destClone = Array.from(destination.tasks);
    const removed = sourceClone.splice(droppableSource.index, 1)[0];
    const updatedTask = { ...removed, status: destination.name };

    destClone.splice(droppableDestination.index, 0, updatedTask);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  //Reorder after dropping on the same column
  const reorder = (list: ColumnType, startIndex: number, endIndex: number) => {
    const result = Array.from(list.tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div className="flex w-full gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {boardDetails.columns.map((column, index) => {
          return <Column columnDetails={column} index={index} key={index} />;
        })}
      </DragDropContext>
      <Link to={genNewSeachParams("editBoard", "true")} className="mt-12 w-[280px] rounded-md bg-medium-grey-#828FA3/10 dark:bg-medium-grey-#828FA3/5 py-5 flex justify-center items-center">
        <span className="text-[1.5rem] font-bold text-medium-grey-#828FA3">
          + New Column
        </span>
      </Link>
    </div>
  );
};

export default Board;
