import ModalContainer from "./ModalContainer";

interface DeleteModalProp {
  handleDelete: () => void;
  title: string;
  description: string;
  handleCancel: () => void
}

const DeleteModal = ({ handleDelete, title, description, handleCancel }: DeleteModalProp) => {
  return (
    <ModalContainer>
      <h1 className="text-[1.125rem] font-bold text-red">{title}</h1>
      <p className="text-[0.8125rem] font-medium leading-[23px] text-medium-grey-#828FA3">
        {description}
      </p>
      <div className="flex flex-col gap-4 text-[0.8125rem] font-bold">
        <button
          className="rounded-[1.25rem] bg-red py-2 text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="rounded-[1.25rem] bg-purple-#635FC7/10 py-2 text-purple-#635FC7" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
};

export default DeleteModal;
