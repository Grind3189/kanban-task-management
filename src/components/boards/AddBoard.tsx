import ModalContainer from "../shared/ModalContainer";
import FormInput from "../shared/form/FormInput";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addBoard } from "../../redux/boardSlice";
import { BoardType, TaskType } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import PurpleButton from "../shared/form/PurpleButton";
import LightPurpleButton from "../shared/form/LightPurpleButton";
import DeleteInput from "../shared/form/DeleteInput";

interface BoardDetailsType {
  name: string;
  error: string;
  _id: string;
  columns:
    | {
        name: string;
        _id: string;
        error: string;
        tasks: TaskType[] | [];
      }[]
    | [];
}

interface AddBoardType {
  name: string;
  _id: string;
  columns: {
    name: string;
    tasks: TaskType[] | [];
  }[];
}

interface AddBoardProp {
  editBoard?: boolean;
  filteredBoard?: BoardType;
}

const AddBoard = ({ editBoard = false, filteredBoard }: AddBoardProp) => {
  const updatedBoardDetails: BoardDetailsType = {
    ...filteredBoard,
    name: filteredBoard?.name || "",
    _id: filteredBoard?._id || nanoid(),
    error: "",
    columns:
      filteredBoard?.columns.map((column) => {
        return {
          ...column,
          _id: nanoid(),
          error: "",
        };
      }) || [],
  };

  const [boardDetails, setBoardDetails] = useState<BoardDetailsType>(
    editBoard
      ? updatedBoardDetails
      : {
          name: "",
          error: "",
          _id: nanoid(),
          columns: [
            {
              name: "Todo",
              _id: nanoid(),
              error: "",
              tasks: [],
            },
            { name: "Doing", _id: nanoid(), error: "", tasks: [] },
          ],
        },
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Handle Duplicates
  useEffect(() => {
    const names = new Set();
    const duplicates = new Set();

    const updatedColumns = boardDetails.columns;

    for (const column of updatedColumns) {
      if (names.has(column.name)) {
        duplicates.add(column.name);
      } else names.add(column.name);
    }

    for (const column of updatedColumns) {
      if (column.name && duplicates.has(column.name)) {
        column.error = "Check for duplicates";
      } else if (column.error !== "Can't be empty") {
        column.error = "";
      }
    }

    setBoardDetails((prev) => ({ ...prev, columns: updatedColumns }));
  }, [boardDetails.columns]);

  const handleChangeBoardDetails = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.name !== "board") {
      const columnId = e.target.name;
      const updatedColumn = boardDetails.columns.map((column) => {
        if (column._id === columnId) {
          return {
            ...column,
            error: "",
            name: e.target.value,
          };
        } else return column;
      });
      return setBoardDetails((prev) => ({ ...prev, columns: updatedColumn }));
    }

    return setBoardDetails((prev) => ({
      ...prev,
      error: "",
      name: e.target.value,
    }));
  };

  const handleAddColumn = () => {
    setBoardDetails((prev) => {
      return {
        ...prev,
        columns: [
          ...prev.columns,
          { name: "", _id: nanoid(), error: "", tasks: [] },
        ],
      };
    });
  };

  const handleDeleteColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedColumns = boardDetails.columns.filter(
      (column) => column._id !== e.currentTarget.dataset.id,
    );
    setBoardDetails((prev) => ({ ...prev, columns: updatedColumns }));
  };

  const handleValidation = () => {
    let hasError: boolean = false;

    const board = boardDetails;

    if (!board.name) {
      hasError = true;
      setBoardDetails((prev) => ({ ...prev, error: "Can't be empty" }));
    }

    const updatedColumns = board.columns.map((column) => {
      if (!column.name) {
        hasError = true;
        return {
          ...column,
          error: "Can't be empty",
        };
      } else if (column.error) {
        hasError = true;
        return column;
      } else return column;
    });

    if (hasError)
      return setBoardDetails((prev) => ({ ...prev, columns: updatedColumns }));

    const updatedBoard = {
      name: board.name,
      _id: board._id,
      columns: updatedColumns.map((column) => {
        return {
          name: column.name,
          tasks: column.tasks,
        };
      }),
    };

    handleAddBoard(updatedBoard);
  };

  const handleAddBoard = (board: AddBoardType) => {
    dispatch(addBoard({ board, editBoard }));
    if (!editBoard) {
      navigate(`/?board=${board._id}`);
    } else {
      navigate(location.state.prevPath);
    }
  };

  return (
    <ModalContainer>
      <form className="flex flex-col gap-6 dark:text-white">
        <h1 className="text-[1.125rem] font-bold">
          {editBoard ? "Edit Board" : "Add New Board"}
        </h1>
        <div className="flex flex-col gap-2">
          <label className="text-[0.75rem] font-bold text-medium-grey-#828FA3">
            Board Name
          </label>
          <div className="relative w-full">
            <FormInput
              name="board"
              placeholder="e.g. Web Design"
              handleChange={handleChangeBoardDetails}
              value={boardDetails.name}
            />
            <span className="absolute bottom-2 right-[16px] top-2 text-[0.8125rem] text-red">
              {boardDetails.error}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-bold text-medium-grey-#828FA3">
            Board Columns
          </span>
          <div className="flex flex-col gap-3">
            {boardDetails.columns.map((column) => (
              <div className="flex items-center gap-4" key={column._id}>
                <div className="relative w-full">
                  <FormInput
                    name={column._id}
                    placeholder=""
                    key={column._id}
                    value={column.name}
                    hasError={column.error ? true : false}
                    handleChange={handleChangeBoardDetails}
                  />
                  {column.error && (
                    <span className="absolute bottom-2 right-[16px] top-2 text-[0.8125rem] text-red">
                      {column.error}
                    </span>
                  )}
                </div>
                <DeleteInput handleDelete={handleDeleteColumn} sharedId={column._id} />
              </div>
            ))}
            <LightPurpleButton
              handleClick={handleAddColumn}
            >
              + Add New Column
            </LightPurpleButton>
          </div>
        </div>

        <PurpleButton handleClick={handleValidation}>
          {editBoard ? "Save Changes" : "Create New Board"}
        </PurpleButton>
      </form>
    </ModalContainer>
  );
};

export default AddBoard;
