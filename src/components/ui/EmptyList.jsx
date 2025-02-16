import React from "react";

function EmptyList({ rule }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-8 mt-8">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-bold text-amber-900 mb-2">
        No {rule}s Found
      </h2>
      <p className="text-amber-600 text-center mb-8 max-w-md">
        It looks like there are no {rule}s in the company yet. Start building
        your team by adding your first {rule}.
      </p>

      {/* Add Button */}
      <button
        className="flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-not-allowed"
        disabled //disabled
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Add First {rule}</span>
      </button>
    </div>
  );
}

export default EmptyList;
