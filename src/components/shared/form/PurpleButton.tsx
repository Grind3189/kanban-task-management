interface PurpleButtonProp {
  children: React.ReactNode;
  handleClick: () => void;
}

const PurpleButton = ({ children, handleClick }: PurpleButtonProp) => {
  return (
    <button
      className="h-[40px] rounded-[20px] bg-purple-#635FC7 py-2 text-[0.8125rem] font-bold text-white"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default PurpleButton;
