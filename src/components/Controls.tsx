import { useState, useRef, useEffect } from "react";
import { useCountryStore } from "../stores/useCountryStore";
import { Search, ChevronDown } from "lucide-react";

const regions = ["All Regions", 'Asia', 'Africa', 'Americas', 'Europe', 'Oceania', 'Antarctic'];

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
    <div className="flex flex-row justify-between items-center w-full max-w-[1600px] mx-auto my-10">
      
      {/* Search Field */}
      <div className="relative flex flex-row items-center justify-center m-0">
        <label htmlFor="search" className="absolute left-3 text-(--input-text-color)">
          <Search className="w-5 h-5" />
        </label>
        <input 
          type="text" 
          placeholder="Search for a country..."
          name="search"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-120 py-4 px-12 bg-(--elements-color) text-(--input-text-color) border-none 
          focus:border-(--text-color) outline-none rounded-lg shadow-md placeholder:text-(--input-text-color) text-[16px]" 
        />
      </div>

      {/* Dropdown List */}
      <div className="relative" ref={dropdownRef} title="Filter by Region">
        <button 
          onClick={toggleDropdown}
          className="flex flex-row justify-between items-center gap-x-3 p-4 w-50 
          bg-(--elements-color) text-(--text-color) text-[16px] font-semibold rounded-lg shadow-md 
          cursor-pointer"
        >
          {selectedRegion || "Filter by Region"} <ChevronDown />
        </button>

        {isDropdownOpen && (
          <ul className="absolute flex flex-col w-full bg-(--elements-color) text-(--text-color) 
          mt-2 rounded-lg font-semibold overflow-hidden shadow-lg z-10">
            {regions.map((region, index) => {
              return (
                <button 
                  key={index} 
                  onClick={() => handleSelectRegion(region)} 
                  className={`w-full p-3 text-left cursor-pointer transition-colors duration-200
                    hover:bg-[#171d23]
                    ${selectedRegion === region ? 'bg-[#171d23]' : ''}`}
                >
                  {region}
                </button>
              );
            })}
          </ul>
        )}
      </div>

    </div>
  );
}