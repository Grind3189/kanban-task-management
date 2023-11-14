import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import showSidebarIc from "../../assets/icon-show-sidebar.svg";

function Layout() {
  const savedFromStorage = localStorage.getItem("showSidebar");
  const parsedData = savedFromStorage ? JSON.parse(savedFromStorage) : false;
  const [showSidebar, setShowSidebar] = useState<boolean>(parsedData);
  const fromStorage = localStorage.getItem("darkMode");
  const parsed = fromStorage ? JSON.parse(fromStorage) : false;
  const [darkMode, setDarkMode] = useState<boolean>(parsed);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleModal = () => {
    setShowSidebar((prev) => {
      localStorage.setItem("showSidebar", JSON.stringify(!prev))
      return !prev
    });
  };
  return (
    <div className="flex-col overflow-auto md:flex">
      <div className="fixed left-0 right-0 top-0 z-50 h-[64px] bg-white dark:bg-dark-grey-#2B2C37 md:h-[80px] xl:h-[96px]">
        <Navbar
          showModal={showSidebar}
          toggleModal={toggleModal}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>

      <div className="flex max-h-fit min-h-screen">
        <div
          className={`bg-white transition-all duration-75 dark:bg-dark-grey-#2B2C37 max-md:hidden ${
            showSidebar
              ? "visible w-[260px] min-w-[260px] translate-x-0 opacity-100 xl:w-[300px] xl:min-w-[300px]"
              : "invisible w-0 min-w-0 translate-x-[-100%] opacity-0"
          }`}
        >
          <Sidebar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            toggleSidebar={toggleModal}
          />
        </div>
        <div className="mt-[4rem] w-fit px-4 py-6 md:mt-[5rem] xl:mt-[6rem]">
          <Outlet />
        </div>
      </div>

      <button
        className={`fixed bottom-8 flex h-[48px] w-[56px] items-center justify-center rounded-r-[100px] bg-purple-#635FC7 transition-all max-md:hidden ${
          showSidebar
            ? "invisible translate-x-[-50%] opacity-0"
            : "visible translate-x-0 opacity-100"
        }`}
        onClick={toggleModal}
      >
        <img src={showSidebarIc} alt="eye icon" />
      </button>
    </div>
  );
}

export default Layout;
