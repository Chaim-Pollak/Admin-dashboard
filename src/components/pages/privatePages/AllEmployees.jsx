import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ActionContext } from "../../contexts/ActionContext";
import useSuggestions from "../../hooks/useSuggestions.jsx";
import { exportToXL } from "../../../lib";
import HeaderTableEmployee from "../tables/employees/HeaderTableEmployee.jsx";
import Header from "../../ui/Header";
import Pagination from "../../ui/Pagination";
import WaveLoader from "../../ui/WaveLoader";
import EmptyList from "../../ui/EmptyList.jsx";

function AllEmployees() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { handleAddEmployee, getAllDetails, handleEditEmployee } =
    useContext(ActionContext);

  const url = `/users/employee/getAllEmployees?page=${page}&limit=${limit}`;
  // its still not working
  const [suggestions, setSearchInput] = useSuggestions("users");

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
    <div className="w-[80%] mx-auto mt-5 p-4 rounded-xl mb-6 animate-slide-down">
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

      {data && !data.allEmployees.length && (
        <p>
          <EmptyList rule={"Employee"} />
        </p>
      )}

      {data && data.allEmployees.length && !isLoading && (
        <HeaderTableEmployee employees={data.allEmployees} />
      )}

      {data?.count > limit && (
        <Pagination listLength={data?.count} limit={limit} setPage={setPage} />
      )}
    </div>
  );
}

export default AllEmployees;
