import menuIc from "../../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

interface ModifyTaskProp {
  handleShowDeleteTask: () => void;
  handleEditTask: () => void;
}

const ModifyTask = ({
  handleShowDeleteTask,
  handleEditTask,
}: ModifyTaskProp) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editModalRef] = useClickOutside({ setShow: setShowEdit });

  const toggleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <div className="relative" ref={editModalRef}>
      <button onClick={toggleShowEdit}>
        <img src={menuIc} alt="three vertical ellipsis" />
      </button>
      <div
        className={`absolute bottom-[-100px] right-0 flex w-[192px] flex-col gap-4 rounded-lg bg-white
          p-4 text-[0.8125rem] font-medium transition-all dark:bg-very-dark-grey-#20212C md:left-[-95px] ${
            showEdit
              ? "visible scale-100 opacity-100"
              : "invisible scale-0 opacity-0"
          }`}
      >
        <button
          className="text-left text-medium-grey-#828FA3"
          onClick={handleEditTask}
        >
          Edit Task
        </button>
        <button className="text-left text-red" onClick={handleShowDeleteTask}>
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default ModifyTask;
