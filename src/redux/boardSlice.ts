import { createSlice } from "@reduxjs/toolkit";
import { ColumnType, SubtaskType, TaskType, BoardType } from "../types";
import boardData from "../data.json";

type UpdateTasksType = {
  payload: {
    columnIndex: number;
    updatedData: TaskType[];
    boardIndex: number;
  };
};
type UpdateColumnType = {
  payload: {
    updatedColumns: ColumnType[];
    boardIndex: number;
  };
};
type DeleteTaskType = {
  payload: {
    taskId: String;
    boardIndex: number;
    status: string;
  };
};
type UpdateSubtasksType = {
  payload: {
    boardIndex: number;
    updatedSubtasks: SubtaskType[];
    taskId: string;
    columnStatus: string;
  };
};
type ChangeTaskStatusType = {
  payload: {
    updatedTask: TaskType;
    boardIndex: number;
  };
};
type AddNewTaskType = {
  payload: {
    newTask: TaskType;
    boardId: string | null;
    editTask: boolean;
  };
};

type DeleteBoardType = {
  payload: {
    boardId: string;
  };
};
type AddBoardType = {
  payload: {
    board: {
      name: string;
      _id: string;
      columns: {
        name: string;
        tasks: [] | TaskType[];
      }[];
    };
    editBoard: boolean;
  };
};

const dataFromStorage = localStorage.getItem("data");
const data = dataFromStorage ? JSON.parse(dataFromStorage) : boardData;

export const boardSlice = createSlice({
  name: "board",
  initialState: data,
  reducers: {
    addBoard: (state, action: AddBoardType) => {
      const newBoard = action.payload.board;
      const boards = state.boards;
      let updatedBoards;
      if (!action.payload.editBoard) {
        updatedBoards = [...boards, newBoard];
      } else {
        updatedBoards = boards.map((board: BoardType) => {
          if (board._id === newBoard._id) {
            return {
              ...newBoard,
            };
          } else return board;
        });
      }

      state.boards = updatedBoards;
      localStorage.setItem("data", JSON.stringify(state));
    },
    updateTasks: (state, action: UpdateTasksType) => {
      const columnIndex = action.payload.columnIndex;
      const updatedItems = action.payload.updatedData;
      const boardIndex = action.payload.boardIndex;
      state.boards[boardIndex].columns[columnIndex].tasks = updatedItems;
      localStorage.setItem("data", JSON.stringify(state));
    },
    updateColumn: (state, action: UpdateColumnType) => {
      state.boards[action.payload.boardIndex].columns =
        action.payload.updatedColumns;
      localStorage.setItem("data", JSON.stringify(state));
    },
    deleteTask: (state, action: DeleteTaskType) => {
      const boardIndex = action.payload.boardIndex;
      const taskId = action.payload.taskId;
      const status = action.payload.status;
      const boards = state.boards;
      const updatedColumns = boards[boardIndex].columns.map(
        (column: ColumnType) => {
          if (column.name === status) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task._id !== taskId),
            };
          } else return column;
        },
      );

      state.boards[boardIndex].columns = updatedColumns;
      localStorage.setItem("data", JSON.stringify(state));

    },
    updateSubtasks: (state, action: UpdateSubtasksType) => {
      const boards = state.boards;
      const updatedData = boards[action.payload.boardIndex].columns.map(
        (column: ColumnType) => {
          if (column.name === action.payload.columnStatus) {
            return {
              ...column,
              tasks: column.tasks.map((task) => {
                if (task._id === action.payload.taskId) {
                  return {
                    ...task,
                    subtasks: action.payload.updatedSubtasks,
                  };
                } else return task;
              }),
            };
          } else return column;
        },
      );

      state.boards[action.payload.boardIndex].columns = updatedData;
      localStorage.setItem("data", JSON.stringify(state));
    },
    changeTaskStatus: (state, action: ChangeTaskStatusType) => {
      const boardIndex = action.payload.boardIndex;
      const updatedTask = action.payload.updatedTask;
      const boards = state.boards;
      const updatedColumns = boards[boardIndex].columns.map(
        (column: ColumnType) => {
          if (column.name === updatedTask.status) {
            return {
              ...column,
              tasks: [...column.tasks, updatedTask],
            };
          } else {
            return {
              ...column,
              tasks: column.tasks.filter(
                (task) => task._id !== updatedTask._id,
              ),
            };
          }
        },
      );
      state.boards[boardIndex].columns = updatedColumns;
      localStorage.setItem("data", JSON.stringify(state));

    },
    addNewTask: (state, action: AddNewTaskType) => {
      const boards = state.boards;
      const newTask = action.payload.newTask;
      let boardIndex: number = 0;

      boards.forEach((board: BoardType, index: number) => {
        if (board._id === action.payload.boardId) boardIndex = index;
      });

      let updatedColumns = [];

      if (!action.payload.editTask) {
        updatedColumns = boards[boardIndex].columns.map(
          (column: ColumnType) => {
            if (column.name === newTask.status) {
              return {
                ...column,
                tasks: [...column.tasks, newTask],
              };
            } else return column;
          },
        );
      } else {
        //Remove the existing data of task
        updatedColumns = boards[boardIndex].columns.map(
          (column: ColumnType) => {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task._id !== newTask._id),
            };
          },
        );

        //Add the new task to tasks
        updatedColumns = updatedColumns.map((column: ColumnType) => {
          if (column.name === newTask.status) {
            return {
              ...column,
              tasks: [...column.tasks, newTask],
            };
          } else return column;
        });
      }

      state.boards[boardIndex].columns = updatedColumns;
      localStorage.setItem("data", JSON.stringify(state));

    },

    deleteBoard: (state, action: DeleteBoardType) => {
      const boards = state.boards;
      const updatedBoards = boards.filter(
        (board: BoardType) => board._id !== action.payload.boardId,
      );
      state.boards = updatedBoards;
      localStorage.setItem("data", JSON.stringify(state));
    },
  },
});
export const {
  updateTasks,
  updateColumn,
  deleteTask,
  updateSubtasks,
  changeTaskStatus,
  addNewTask,
  deleteBoard,
  addBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
