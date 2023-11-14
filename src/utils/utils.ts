import { useSearchParams } from "react-router-dom";
import { BoardsType } from "../types";

export const genNewSeachParams = (key: string, value: string) => {
  const [searchParams] = useSearchParams();
  const sp = new URLSearchParams(searchParams);

  if (!value) {
    sp.delete(key);
  } else {
    sp.set(key, value);
  }
  return `?${sp.toString()}`;
};

export const getBoardIndex = (boardId: string | null, boards: BoardsType) => {
  let boardIndex = 0
  boards.map((board, i) => {
    if (board._id === boardId) return (boardIndex = i);
  });

  return boardIndex
};
