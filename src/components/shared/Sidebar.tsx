import NavContent from "./NavContent";
import ThemeButton from "./ThemeButton";
import hideSidebarIc from '../../assets/icon-hide-sidebar.svg'

interface SidebarProp {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void
}

const Sidebar = ({ darkMode, toggleDarkMode, toggleSidebar }: SidebarProp) => {
  return (
    <div className="flex flex-col pb-10 h-full pt-[112px]">
      <NavContent />
      <ThemeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <button className="flex items-center mt-[1.375rem] ml-[1.9375rem] gap-4" onClick={toggleSidebar}>
        <img src={hideSidebarIc} alt="eye icon" />
        <span className="text-medium-grey-#828FA3 font-bold text-[0.9375rem]" >Hide Sidebar</span>
      </button>
    </div>
  );
};

export default Sidebar;
