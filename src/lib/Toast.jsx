import { toast } from "react-toastify";

export function showSuccessToast(msg) {
  toast.success(msg, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      background: "rgb(251 243 219)", // matches bg-amber-50
      borderLeft: "4px solid rgb(217 119 6)", // amber-600
      color: "rgb(146 64 14)", // amber-800
      boxShadow: "0 4px 6px -1px rgba(217, 119, 6, 0.1)",
      "--toastify-icon-color-success": "rgb(217 119 6)", // amber-600 for success icon
      "--toastify-color-progress-success": "rgb(217 119 6)", // amber-600 for progress bar
    },
    progressStyle: {
      background: "rgb(217 119 6)", // amber-600
    },
  });
}

export function showErrorToast(msg) {
  toast.error(msg, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      background: "rgb(251 243 219)", // matches bg-amber-50
      borderLeft: "4px solid rgb(220 38 38)", // red-600
      color: "rgb(146 64 14)", // amber-800
      boxShadow: "0 4px 6px -1px rgba(217, 119, 6, 0.1)",
      "--toastify-icon-color-error": "rgb(220 38 38)", // red-600 for error icon
      "--toastify-color-progress-error": "rgb(220 38 38)", // red-600 for progress bar
    },
    progressStyle: {
      background: "rgb(220 38 38)", // red-600
    },
  });
}
