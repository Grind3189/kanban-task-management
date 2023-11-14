import Droppable from "../../utils/Droppable";
import { ColumnType } from "../../types";
import Tasks from "../tasksList/Tasks";

interface ColumnProp {
  index: number;
  columnDetails: ColumnType;
}

const Column = ({ index, columnDetails }: ColumnProp) => {
  const colors = ["#49C4E5", "#8471F2", "#67E2AE"];

  return (
    <Droppable key={index} droppableId={`${index}`}>
      {(provided) => (
        <div
          className="flex w-[280px] min-w-[280px] flex-col gap-6"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex items-center gap-3 text-medium-grey-#828FA3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle
                cx="7.5"
                cy="7.5"
                r="7.5"
                fill={colors[index % colors.length]}
              />
            </svg>
            <span>
              {columnDetails.name} ({columnDetails.tasks.length})
            </span>
          </div>
          <Tasks tasks={columnDetails.tasks} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
