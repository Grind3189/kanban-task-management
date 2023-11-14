interface FormInputProp {
  value: string;
  name: string;
  placeholder: string;
  hasError?: boolean;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

const FormInput = ({
  value,
  handleChange,
  name,
  placeholder,
  hasError = false,
}: FormInputProp) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full rounded-inputs border ${hasError ? "border-red" : "border-[#828FA340]"} bg-white px-4 py-2 text-[0.8125rem] font-medium outline-none focus:border-purple-#635FC7 dark:bg-dark-grey-#2B2C37 dark:text-white`}
      name={name}
      onChange={handleChange}
      id={name}
      value={value}
    />
  );
};

export default FormInput;
