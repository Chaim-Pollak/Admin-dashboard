import React from "react";

function CloseButton({ modalId, onCancel }) {
  const handleCancel = () => {
    const modal = document.getElementById(modalId);

    if (!modal) {
      console.error(`Modal with ID ${modalId} not found.`);
      return;
    }

    if (onCancel) {
      onCancel();
    }
    document.getElementById(modalId).close();
  };

  return (
    <button
      type="button"
      className="px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
}

export default CloseButton;
