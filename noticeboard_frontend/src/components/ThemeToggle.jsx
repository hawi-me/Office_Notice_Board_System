import { toggleDarkMode } from "../utils/theme";

const ThemeToggle = () => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      Toggle Dark Mode
    </button>
  );
};

export default ThemeToggle;
