import { Listbox } from "@headlessui/react";
import { useState, useEffect } from "react";
import { TaskType } from "../../types";
import arrowIc from "../../assets/icon-chevron-down.svg";

interface PickStatusProp {
  listOfStatus: string[];
  setNewTask: React.Dispatch<React.SetStateAction<TaskType>>;
}
const PickStatus = ({ listOfStatus, setNewTask}: PickStatusProp) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(listOfStatus[0]);

  useEffect(() => {
    setNewTask(prev => ({...prev, status: selectedStatus}))
  }, [selectedStatus]);

  const handleChangeStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedStatus(e.currentTarget.id);
  };
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.75rem] font-bold text-medium-grey-#828FA3 dark:text-white">
        Status
      </span>
      <Listbox>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`flex items-center justify-between rounded-inputs border ${
                open ? "border-purple-#635FC7" : "border-[#828FA340]"
              }  px-4 py-2`}
            >
              <span className="text-[0.8125rem] font-medium dark:text-white">
                {selectedStatus}
              </span>
              <img
                src={arrowIc}
                alt="arrow down"
                className={`${open ? "rotate-180" : "rotate-0"}`}
              />
            </Listbox.Button>
            <Listbox.Options className="flex flex-col gap-2 rounded-lg p-4 text-medium-grey-#828FA3 dark:bg-very-dark-grey-#20212C">
              {listOfStatus.map((status, i) => {
                return (
                  <button
                    key={i}
                    id={status}
                    onClick={handleChangeStatus}
                    className="cursor-pointer text-left"
                  >
                    {status}
                  </button>
                );
              })}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default PickStatus;
