interface SubtaskProp {
  subTaskDetails: {
    isCompleted: boolean;
    title: string;
    id: string
  };
  handleSubtaskCheck: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Subtask = ({ subTaskDetails, handleSubtaskCheck }: SubtaskProp) => {
  
  return (
    <button
      onClick={handleSubtaskCheck}
      data-title={subTaskDetails.id}
      className={`flex items-center gap-4 rounded-inputs text-left bg-light-grey-#F4F7FD px-3 py-4 ${
        !subTaskDetails.isCompleted
          ? "dark:bg-purple-#635FC7/25"
          : "dark:bg-very-dark-grey-#20212C"
      } dark:text-white`}
    >
      {subTaskDetails.isCompleted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <rect width="16" height="16" rx="2" fill="#635FC7" />
          <path
            d="M4.27583 8.0658L7.03229 10.8223L12.0323 5.82227"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <div className="h-[16px] w-[16px] rounded-sm border-medium-grey-#828FA3 bg-medium-grey-#828FA3 dark:bg-white" />
      )}
      <span
        className={`text-[0.75rem] font-bold ${
          subTaskDetails.isCompleted &&
          "text-medium-grey-#828FA3 line-through decoration-medium-grey-#828FA3"
        }`}
      >
        {subTaskDetails.title}
      </span>
    </button>
  );
};

export default Subtask;
