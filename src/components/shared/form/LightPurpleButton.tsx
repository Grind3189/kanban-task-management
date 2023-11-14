interface LightPurpleButtonProp {
  children: React.ReactNode;
  handleClick: () => void;
}

const LightPurpleButton = ({
  children,
  handleClick,
}: LightPurpleButtonProp) => {
  return (
    <button
      className="h-[40px] w-full rounded-[20px] bg-[#635FC71A] py-2 text-[0.8125rem] font-bold text-purple-#635FC7 dark:bg-white dark:text-purple-#635FC7 lg:hover:bg-purple-#635FC7/25"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default LightPurpleButton;
