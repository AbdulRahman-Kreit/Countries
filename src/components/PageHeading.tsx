import { useEffect } from "react";
import { useCountryStore } from "../stores/useCountryStore";
import { Sun, Moon } from "lucide-react";

export default function PageHeading() {
  const darkMode = useCountryStore((state) => state.isDarkMode);
  const toggleTheme = useCountryStore((state) => state.toggleTheme);
  const initTheme = useCountryStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <header className="w-full shadow-md bg-(--elements-color) transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-row justify-between items-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
          Where in the world?
        </h2>

        <button 
          onClick={toggleTheme}
          className="flex items-center gap-2 font-semibold text-sm md:text-lg cursor-pointer 
          hover:opacity-80 transition-opacity"
        >
          {darkMode ? (
            <span className="flex items-center gap-2">
              <Sun className="w-4! h-4! md:w-6! md:h-6!" /> Light Mode
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Moon className="w-4! h-4! md:w-6! md:h-6!" /> Dark Mode
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
