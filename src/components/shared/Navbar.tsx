import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { genNewSeachParams } from "../../utils/utils";
import { useState } from "react";
import addIc from "../../assets/icon-add-task-mobile.svg";
import arrowDownIc from "../../assets/icon-chevron-down.svg";
import NavContent from "./NavContent";
import ThemeButton from "./ThemeButton";
import ModifyBoard from "./ModifyBoard";
import DeleteModal from "./DeleteModal";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../redux/boardSlice";
import { BoardType } from "../../types";

interface NavbarProp {
  showModal: boolean;
  toggleModal: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({
  showModal,
  toggleModal,
  toggleDarkMode,
  darkMode,
}: NavbarProp) => {
  const [searchParams] = useSearchParams();
  const data = useSelector((state: RootState) => state.boards);
  const boardId = searchParams.get("board") || data.boards[0]._id;
  const [showDeleteBoard, setShowDeleteBoard] = useState<boolean>(false);
  const filteredBoard = data.boards.filter(
    (board: BoardType) => board._id === boardId,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowDeleteBoard = () => {
    setShowDeleteBoard((prev) => !prev);
  };

  const handleDeleteBoard = () => {
    setShowDeleteBoard(false);
    navigate("/");
    dispatch(deleteBoard({ boardId }));
  };

  return (
    <header className="flex h-full items-center gap-4 px-4 md:px-6 xl:px-[1.625rem]">
      <div className="h-[25px] w-[24px] bg-logo-mobile bg-cover md:w-[152px] md:bg-logo-dark dark:md:bg-logo-light" />
      <hr
        className={`mx-6 h-full w-[1px] border-r border-r-lines-light-#E4EBFA transition-all dark:border-r-lines-dark-#3E3F4E max-md:hidden ${
          showModal && "ml-[4.2rem] xl:ml-[6.6rem]"
        }`}
      />

      <div className="flex items-center gap-[0.5625rem]">
        <div className="w-[150px] whitespace-nowrap md:w-auto">
          <h1 className="text-[1.1125rem] font-bold capitalize dark:text-white xl:text-[1.5rem] text-ellipsis overflow-hidden">
            {filteredBoard[0].name}
          </h1>
        </div>
        <button onClick={toggleModal} className="md:hidden">
          <img src={arrowDownIc} alt="arrow down icon" />
        </button>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Link
          to={genNewSeachParams("addTask", "true")}
          state={{
            prevPath: location.search
              ? location.pathname + location.search
              : location.pathname,
          }}
          className="flex h-[32px] w-[48px] items-center justify-center rounded-button bg-purple-#635FC7 md:h-[48px] md:w-[164px] md:gap-1"
        >
          <img src={addIc} alt="add icon" />
          <span className="text-[15px] font-bold text-white max-md:hidden">
            Add New Task
          </span>
        </Link>
        <ModifyBoard
          handleShowDeleteBoard={handleShowDeleteBoard}
          boardId={boardId}
        />
      </div>

      <div
        className={`fixed left-0 top-0 h-full w-full bg-black/50 md:hidden ${
          showModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={toggleModal}
      />

      <div
        className={`fixed left-[54px] top-[80px] flex min-h-[322px] w-[264px] flex-col rounded-lg bg-white py-4 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] transition-all dark:bg-dark-grey-#2B2C37 md:hidden ${
          showModal
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-[-50%] opacity-0"
        }`}
      >
        <NavContent />
        <ThemeButton toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>

      {showDeleteBoard && (
        <div
          className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50"
          onClick={handleShowDeleteBoard}
        >
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <DeleteModal
              handleCancel={handleShowDeleteBoard}
              handleDelete={handleDeleteBoard}
              title="Delete this board?"
              description={`Are you sure you want to delete the ‘${filteredBoard[0].name}’ board? This action
              will remove all columns and tasks and cannot be reversed.`}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
