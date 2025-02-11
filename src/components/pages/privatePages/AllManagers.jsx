import React, { useContext, useEffect, useState } from "react";
import Header from "../../ui/Header";
import axios from "axios";
import ManagersTable from "../tables/managers/ManagerTable";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../../ui/SearchInput.jsx";
import { debounce, exportToXL } from "../../../lib";
import Pagination from "../../ui/Pagination";
import useSuggestions from "../../hooks/useSuggestions";
import { ActionContext } from "../../contexts/ActionContext";
import Button from "../../ui/AddButton.jsx";
import ExportButton from "../../ui/ExportButton.jsx";
import { Filter, ChevronDown, Plus } from "lucide-react";
import WaveLoader from "../../ui/WaveLoader";

function AllManagers() {
  const { handleAddManager, getAllDetails } = useContext(ActionContext);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const url = `/users/manager/getAllManagers?page=${page}&limit=${limit}`;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_managers", page],
    queryFn: async () => (await axios.get(url)).data,
    select: (data) => ({
      AllManagers: data.data,
      count: data.count,
    }),
  });

  const [suggestions, setSearchInput] = useSuggestions("users");
  const { handleEditManager } = useContext(ActionContext);

  async function downloadXl() {
    const result = await getAllDetails("/users/manager/getAllManagers");

    if (!result) return;

    const prepareDataForExcel = result.map((item) => {
      return {
        id: item._id,
        "Manager Name": item.manager_name,
        "Manager Email": item.manager_email,
        permission: item.permission,
        "Created At": item.createdAt,
        "Updated At": item.updatedAt,
      };
    });

    exportToXL(prepareDataForExcel, "managersSheet");
  }

  return (
    <div className="w-[80%] mx-auto mt-5 p-4 shadow-md rounded-xl mb-6 animate-slide-down">
      <Header
        title="Manager Management"
        downloadFn={downloadXl}
        setSearchInput={setSearchInput}
        suggestions={suggestions}
        suggestionKey={"manager_name"}
        onClick={(current) => handleEditManager({ ...current, bySearch: true })}
        addBtnName="Add New Manager"
        onAdd={handleAddManager}
      />

      {isLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <WaveLoader />
        </div>
      )}

      {isError && <div>{error}</div>}
      {data && !data.AllManagers.length && (
        <p>No Categories Yet, please add Categories</p>
      )}
      {data && data?.AllManagers.length && !isLoading && (
        <ManagersTable managers={data.AllManagers} />
      )}
      {data?.count > limit && (
        <Pagination listLength={data?.count} limit={limit} setPage={setPage} />
      )}
    </div>
  );
}

export default AllManagers;
