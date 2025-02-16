import React from "react";
import ExportButton from "./ExportButton";
import SearchInput from "./SearchInput";
import AddButton from "./AddButton";
import { Filter, ChevronDown } from "lucide-react";

function Header({
  title,
  downloadFn,
  setSearchInput,
  suggestions,
  suggestionKey,
  onClick,
  addBtnName,
  onAdd,
}) {
  return (
    <div className="bg-white border-solid border-2 border-amber-300 my-auto p-4 shadow-md rounded-xl mb-6 animate-slide-down flex flex-wrap gap-4 items-center justify-between">
      <ExportButton download={downloadFn} />
      <SearchInput
        setSearchInput={setSearchInput}
        suggestions={suggestions}
        suggestionKey={suggestionKey}
        onClick={onClick}
        placeholder="Search by email..."
      />
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-amber-900">{title}</h1>
      </div>
      <button className="flex justify-center items-center gap-2 px-4 py-2 h-10 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-all duration-200">
        <Filter className="w-3 h-3" />
        <span>Filter</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      <AddButton name={addBtnName} onClick={onAdd} />
    </div>
  );
}

export default Header;
