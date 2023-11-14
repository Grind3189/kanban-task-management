import boardIc from "../../assets/icon-board.svg";
import boardPurpleIc from "../../assets/icon-board-purple.svg";
import { useSelector } from "react-redux/es/exports";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { RootState } from "../../redux/store";
import { genNewSeachParams } from "../../utils/utils";
import { BoardType } from "../../types";

const NavContent = () => {
  const { boards } = useSelector((state: RootState) => state.boards);
  const [searchParams] = useSearchParams();
  const currentBoardId = searchParams.get("board");
  const addBoardUrl = genNewSeachParams("addBoard", "true");
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddBoard = () => {
    navigate(addBoardUrl, {
      state: {
        prevPath: location.search
          ? location.pathname + location.search
          : location.pathname,
      },
    });
  };

  return (
    <>
      <h1 className="mb-[1.1875rem] ml-6 text-[0.75rem] font-bold uppercase tracking-[2.4px] text-medium-grey-#828FA3">
        All Boards ({boards.length})
      </h1>

      <div>
        {boards.map((board: BoardType, index: number) => {
          return (
            <Link
              to={index === 0 ? "/" : `?board=${board._id}`}
              key={index}
              className={`flex h-[48px] w-[90%] items-center gap-3 rounded-r-[100px] px-6 text-[0.9375rem] font-bold 
              ${
                currentBoardId === board._id || (!currentBoardId && index === 0)
                  ? "bg-purple-#635FC7 text-white "
                  : "text-medium-grey-#828FA3"
              }`}
            >
              <img src={boardIc} alt=" board icon" />
              <span className="capitalize">{board.name}</span>
            </Link>
          );
        })}
      </div>

      <button className="ml-6 mt-2 flex items-center" onClick={handleAddBoard}>
        <img src={boardPurpleIc} alt="board icon purple" className="mr-3" />
        <span className="text-[0.9375rem] font-bold text-purple-#635FC7">
          +Create New Board
        </span>
      </button>
    </>
  );
};

export default NavContent;
