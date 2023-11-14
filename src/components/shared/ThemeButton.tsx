import { Switch } from "@headlessui/react";
import { useEffect } from "react";
import sunIc from "../../assets/icon-light-theme.svg";
import moonIc from "../../assets/icon-dark-theme.svg";

interface ThemeButtonProp {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeButton = ({darkMode, toggleDarkMode}: ThemeButtonProp) => {

  useEffect(() => {
    const applyDarkMode = () => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
      document.body.style.backgroundColor = darkMode ? "#20212C" : "#F4F7FD";
    };
    applyDarkMode()
  }, [darkMode]);
  
  darkMode
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");

  return (
    <div className="mt-auto px-4">
      <div className="flex h-[48px] items-center justify-center gap-6 rounded-lg bg-light-grey-#F4F7FD transition-all dark:bg-very-dark-grey-#20212C">
        <img src={sunIc} alt="sun icon" />
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          className={`relative inline-flex h-[22px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple-#635FC7 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden="true"
            className={`${darkMode ? "translate-x-6" : "translate-x-0"}
      pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <img src={moonIc} alt="half moon icon" />
      </div>
    </div>
  );
};

export default ThemeButton;
