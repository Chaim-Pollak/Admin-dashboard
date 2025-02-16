import React from "react";
import { FaSearchengin } from "react-icons/fa";
import { Search } from "lucide-react";

function SearchInput({
  setSearchInput,
  suggestions,
  suggestionKey,
  onClick,
  placeholder,
}) {
  return (
    <div className="relative flex-1 min-w-[150px] max-w-[300px] ">
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full pl-4 py-2 rounded-xl  bg-amber-50 border-2 border-amber-200 focus:outline-none transition-all duration-300"
        id="searchInput"
        name="searchInput"
      />
      <Search className="absolute right-3 top-3.5 text-amber-500 w-5 h-5" />

      {suggestions?.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              onClick={() => onClick(suggestion, setSearchInput(""))}
              key={index}
              className={`px-4 py-2 cursor-pointer text-white bg-[#f1b571] hover:bg-amber-500`}
            >
              {suggestion[suggestionKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
