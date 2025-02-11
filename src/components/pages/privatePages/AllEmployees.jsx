import React, { useState, useContext } from "react";
import EmployeesTable from "../tables/employees/EmployeesTable";
import Header from "../../ui/Header";
import NotEmployees from "./NotEmployees";
import axios from "axios";
import Pagination from "../../ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import Button from "../../ui/AddButton.jsx";
import SearchInput from "../../ui/SearchInput.jsx";
import { ActionContext } from "../../contexts/ActionContext";
import ExportButton from "../../ui/ExportButton.jsx";
import { Filter, ChevronDown } from "lucide-react";
import WaveLoader from "../../ui/WaveLoader";
import { exportToXL } from "../../../lib";

function AllEmployees() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  const { handleAddEmployee, getAllDetails, handleEditEmployee } =
    useContext(ActionContext);

  const url = `/users/employee/getAllEmployees?page=${page}&limit=${limit}`;
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_employees", page],
    queryFn: async () => (await axios.get(url)).data,
    select: (data) => ({
      allEmployees: data.data,
      count: data.count,
    }),
  });

  async function downloadXl() {
    const result = await getAllDetails("/users/employee/getAllEmployees");
    console.log(result);

    if (!result) return;

    const prepareDataForExcel = result.map((item) => {
      return {
        id: item._id,
        "Employee Name": item.employeeName,
        "Employee Email": item.employeeEmail,
        Verified: item.verify ? "Yes" : "No",
        "Created At": item.createdAt,
        "Updated At": item.updatedAt,
      };
    });

    exportToXL(prepareDataForExcel, "employeesSheet");
  }

  return (
    <div className="w-[80%] mx-auto mt-5 p-4 shadow-md rounded-xl mb-6 animate-slide-down">
      <Header
        title="Employee Management"
        downloadFn={downloadXl}
        setSearchInput={setSearchInput}
        suggestions={suggestions}
        suggestionKey={"employeeName"}
        onClick={(current) =>
          handleEditEmployee({ ...current, bySearch: true })
        }
        addBtnName="Add New Employee"
        onAdd={handleAddEmployee}
      />
      {isLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <WaveLoader />
        </div>
      )}

      {isError && <div>{error}</div>}
      {data && !data.allEmployees?.length ? (
        <NotEmployees />
      ) : (
        data &&
        data.allEmployees?.length &&
        !isLoading && <EmployeesTable employees={data.allEmployees} />
      )}
      {data?.count > limit && (
        <Pagination listLength={data?.count} limit={limit} setPage={setPage} />
      )}
    </div>
  );
}

export default AllEmployees;
