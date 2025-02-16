import React from "react";
import { AiOutlineExport } from "react-icons/ai";

function ExportButton({ download }) {
  return (
    <div className="tooltip" data-tip="Export To Excel">
      <button
        onClick={download}
        type="button"
        className="flex items-center justify-center p-2.5 bg-amber-500 via-amber-600 to-amber-300 text-white rounded-xl hover:from-amber-600 hover:via-amber-700 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <AiOutlineExport className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ExportButton;
