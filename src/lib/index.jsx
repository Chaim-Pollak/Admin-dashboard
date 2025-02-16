import * as XLSX from "xlsx";

export function debounce(func, timeout = 1000) {
  // Create Variable
  let timer;
  return (...args) => {
    // Stop the previous Function
    clearTimeout(timer);
    // Start the function when the timeout done
    timer = setTimeout(() => func(args), timeout);
  };
}

function adjustColumnWidths(data) {
  const wsCols = Object.keys(data[0]).map((key) => {
    const maxWidth = Math.max(
      key.length,
      ...data.map((row) => (row[key] ? row[key].toString().length : 0))
    );
    return { wch: maxWidth + 1 };
  });
  return wsCols;
}

export function exportToXL(json, excelName) {
  // Generate XL Page
  const wb = XLSX.utils.book_new();
  // Convert Json To CheetSheet
  const ws = XLSX.utils.json_to_sheet(json);

  ws["!cols"] = adjustColumnWidths(json);

  // Create New Xl Page With Data
  XLSX.utils.book_append_sheet(wb, ws, excelName);
  XLSX.writeFile(wb, `${excelName}.xlsx`);
}
