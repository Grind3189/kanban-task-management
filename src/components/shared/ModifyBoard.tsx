import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { genNewSeachParams } from "../../utils/utils";
import threeDotIc from "../../assets/icon-vertical-ellipsis.svg";
import useClickOutside from "../../hooks/useClickOutside";


interface ModifyBoardProp {
  handleShowDeleteBoard: () => void;
  boardId: string;
}

const ModifyBoard = ({ handleShowDeleteBoard }: ModifyBoardProp) => {
  const [showModifyBoard, setShowModifyBoard] = useState<boolean>(false);
  const [modifyModalRef] = useClickOutside({ setShow: setShowModifyBoard });
  const location = useLocation()
  const navigate = useNavigate();
  const navigateTo = genNewSeachParams("editBoard", "true");
  
  const handleShowModifyBoard = () => {
    setShowModifyBoard((prev) => !prev);
  };

  const handleShowDelete = () => {
    handleShowModifyBoard();
    handleShowDeleteBoard();
  };

  const handleShowEditBoard = () => {
    handleShowModifyBoard();
    navigate(navigateTo, {state: {prevPath: location.search ? location.pathname + location.search : location.pathname}});
  };

  return (
    <>
      <div
        className="relative grid h-full place-items-center"
        ref={modifyModalRef}
      >
        <button onClick={handleShowModifyBoard}>
          <img src={threeDotIc} alt="vertical three dots" />
        </button>
        <div
          className={`absolute bottom-[-125px] right-0 flex w-[192px] flex-col gap-4 rounded-lg bg-white p-4 transition-all ${
            showModifyBoard
              ? "visible scale-100 opacity-100"
              : "invisible scale-50 opacity-0"
          } text-[0.8125rem] font-medium dark:bg-very-dark-grey-#20212C`}
        >
          <button
            className="text-left text-medium-grey-#828FA3"
            onClick={handleShowEditBoard}
          >
            Edit Board
          </button>
          <button className="text-left text-red" onClick={handleShowDelete}>
            Delete Board
          </button>
        </div>
      </div>

    </>
  );
};

export default ModifyBoard;
