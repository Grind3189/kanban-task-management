import { Listbox } from "@headlessui/react";
import arrowIc from "../../assets/icon-chevron-down.svg";
import { useDispatch } from "react-redux";
import { changeTaskStatus } from "../../redux/boardSlice";
import { TaskType } from "../../types";

interface StatusListBoxProp {
  listOfStatus: string[];
  boardIndex: number
  taskDetails: TaskType
}

const StatusListBox = ({ listOfStatus, boardIndex, taskDetails }: StatusListBoxProp) => {
  const dispatch = useDispatch()
  
  const handleUpdateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
      const updatedTask = {...taskDetails, status: e.currentTarget.id}
      dispatch(changeTaskStatus({updatedTask, boardIndex}))
    }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.75rem] font-bold text-medium-grey-#828FA3 dark:text-white">
        Current Status
      </span>
      <Listbox>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={`flex items-center justify-between rounded-inputs border w-full ${
                open ? "border-purple-#635FC7" : "border-[#828FA340]"
              }  px-4 py-2`}
            >
              <span className="dark:text-white">{taskDetails.status}</span>
              <img
                src={arrowIc}
                alt="arrow down"
                className={` transition-all ${open ? "-rotate-180" : "rotate-0"}`}
              />
            </Listbox.Button>
            <Listbox.Options className="flex flex-col gap-2 rounded-lg p-4 bg-white text-medium-grey-#828FA3 dark:bg-very-dark-grey-#20212C absolute left-0 right-0 bottom-[-130px]">
              {listOfStatus.map((status, i) => {
                return (
                  <button key={i} id={status} className="cursor-pointer text-left" onClick={handleUpdateTask}>
                    {status}
                  </button>
                );
              })}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default StatusListBox;
