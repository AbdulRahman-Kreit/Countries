import { useCountryStore } from "../stores/useCountryStore";
import { Search } from "lucide-react";

export default function Controls() {
  const searchQuery = useCountryStore((state) => state.searchQuery);
  const setSearchQuery = useCountryStore((state) => state.setSearchQuery);

  return (
    <div className="flex flex-row justify-between items-center w-full max-w-[1600px] mx-auto my-10">
      <div className="relative flex flex-row items-center justify-center m-0">
        <label htmlFor="search"
        className="absolute left-3 text-(--input-text-color)">
          <Search className="w-5! h-5!" />
        </label>
        <input 
          type="text" 
          placeholder="Search for a country..."
          name="search"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-120 py-3 px-12 bg-(--elements-color) text-(--input-text-color) border-none 
          focus:border-(--text-color) outline-none rounded shadow-md placeholder:text-(--input-text-color) text-[16px]" />
      </div>

    </div>
  )
}
