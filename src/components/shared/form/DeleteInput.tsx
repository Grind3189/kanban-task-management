import React from "react";

interface DeleteInputProp {
    sharedId: string
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DeleteInput = ({sharedId, handleDelete}: DeleteInputProp) => {
  return (
    <button
      className="w-[5%]"
      data-id={sharedId}
      onClick={handleDelete}
    >
      <svg
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        className="group"
      >
        <g
          fill="#828FA3"
          fillRule="evenodd"
          className="lg:group-hover:fill-red"
        >
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </button>
  );
};

export default DeleteInput;
