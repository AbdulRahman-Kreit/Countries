import { useState, useRef, useEffect } from "react";
import { useCountryStore } from "../stores/useCountryStore";
import { Search, ChevronDown } from "lucide-react";

const regions = ["All Regions", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function Controls() {
  const searchQuery = useCountryStore((state) => state.searchQuery);
  const setSearchQuery = useCountryStore((state) => state.setSearchQuery);
  const selectedRegion = useCountryStore((state) => state.selectedRegion);
  const setSelectedRegion = useCountryStore((state) => state.setSelectedRegion);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region); 
    setIsDropdownOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-4
      w-full max-w-[1600px] mx-auto px-4 md:px-0 my-6 md:my-12">
      
      {/* Search Field */}
      <div className="relative w-full md:w-120">
        <label htmlFor="search" className="absolute left-8 top-1/2 -translate-y-1/2 text-(--input-text-color) cursor-pointer">
          <Search className="w-4 h-4 md:w-5 md:h-5" />
        </label>
        <input 
          type="text" 
          placeholder="Search for a country..."
          name="search"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-4 pl-18 pr-6 bg-(--elements-color) text-(--input-text-color) border-none 
            outline-none rounded-md shadow-md placeholder:text-(--input-text-color) text-sm md:text-base transition-all" 
        />
      </div>

      {/* Dropdown List */}
      <div className="relative" ref={dropdownRef} title="Filter by Region">
        <button 
          onClick={toggleDropdown}
          type="button"
          className="flex flex-row justify-between items-center gap-x-6 py-4 px-6 w-52 
            bg-(--elements-color) text-(--text-color) text-sm font-normal rounded-md shadow-md 
            cursor-pointer hover:opacity-95 transition-opacity"
        >
          <span>{selectedRegion && selectedRegion !== "All Regions" ? selectedRegion : "Filter by Region"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <ul className="absolute left-0 w-full bg-(--elements-color) text-(--text-color) 
            mt-1.5 rounded-md overflow-hidden shadow-lg z-20 py-2 text-sm">
            {regions.map((region, index) => {
              return (
                <li key={index}>
                  <button 
                    type="button"
                    onClick={() => handleSelectRegion(region)} 
                    className={`w-full py-2 px-6 text-left cursor-pointer transition-colors duration-150
                      hover:bg-black/10 dark:hover:bg-white/10
                      ${selectedRegion === region ? 'font-bold bg-black/5 dark:bg-white/5' : ''}`}
                  >
                    {region}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

    </div>
  );
}