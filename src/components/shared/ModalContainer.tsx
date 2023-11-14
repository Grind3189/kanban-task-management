interface ModalContainerProp {
  children: React.ReactNode;
}

const ModalContainer = ({ children }: ModalContainerProp) => {
  return (
    <div className="flex w-[343px] flex-col gap-6 rounded-md bg-white p-6 dark:bg-dark-grey-#2B2C37 md:w-[480px] md:p-8">
      {children}
    </div>
  );
};

export default ModalContainer;
