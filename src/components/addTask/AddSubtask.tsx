import { nanoid } from "nanoid/non-secure";
import LightPurpleButton from "../shared/form/LightPurpleButton";
import DeleteInput from "../shared/form/DeleteInput";
import FormInput from "../shared/form/FormInput";

interface SubtasksInputType {
  title: string;
  isCompleted: boolean;
  id: string;
  hasError: boolean;
}

interface AddSubtaskProp {
  setSubtasksInput: React.Dispatch<React.SetStateAction<SubtasksInputType[]>>;
  subtasksInput: SubtasksInputType[];
}

const AddSubtask = ({ subtasksInput, setSubtasksInput }: AddSubtaskProp) => {
  const handleChangeSubtasksDetails = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ,
  ) => {
    const updatedSubtasks = subtasksInput.map((subtask) => {
      if (subtask.id === e.target.id) {
        return {
          ...subtask,
          hasError: false,
          title: e.target.value,
        };
      } else return subtask;
    });
    setSubtasksInput(updatedSubtasks);
  };

  const handleAddNewSubtask = () => {
    setSubtasksInput((prev) => {
      return [
        ...prev,
        { title: "", isCompleted: false, id: nanoid(), hasError: false },
      ];
    });
  };
  const handleDeleteSubtask = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedSubtasks = subtasksInput.filter(
      (subtask) => subtask.id !== e.currentTarget.dataset.id,
    );
    setSubtasksInput(updatedSubtasks);
  };
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[0.75rem] font-bold text-medium-grey-#828FA3 dark:text-white">
        Subtasks
      </span>

      {subtasksInput.map((subtask, i) => {
        return (
          <div className="flex items-center gap-[31px]" key={i}>
            <div className="relative w-[95%]">
              <FormInput
                placeholder={
                  i % 2 === 0 ? "e.g. Make coffee" : "e.g. Drink coffee & smile"
                }
                name={subtask.id}
                value={subtask.title}
                handleChange={handleChangeSubtasksDetails}
              />
              {subtask.hasError && (
                <span className="absolute right-0 px-4 py-2 text-[0.8125rem] font-medium text-red md:hidden">
                  *
                </span>
              )}
              {subtask.hasError && (
                <span className="absolute right-0 px-4 py-2 text-[0.8125rem] font-medium text-red max-md:hidden">
                  Can't be empty
                </span>
              )}
            </div>
            <DeleteInput
              handleDelete={handleDeleteSubtask}
              sharedId={subtask.id}
            />
          </div>
        );
      })}
      <LightPurpleButton handleClick={handleAddNewSubtask}>
        +Add New Subtask
      </LightPurpleButton>
    </div>
  );
};

export default AddSubtask;
