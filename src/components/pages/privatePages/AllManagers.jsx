import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ActionContext } from "../../contexts/ActionContext";
import useSuggestions from "../../hooks/useSuggestions";
import { exportToXL } from "../../../lib";
import HeaderTableManager from "../tables/managers/HeaderTableManager.jsx";
import Header from "../../ui/Header";
import Pagination from "../../ui/Pagination";
import WaveLoader from "../../ui/WaveLoader";
import EmptyList from "../../ui/EmptyList.jsx";

function AllManagers() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { handleAddManager, getAllDetails, handleEditManager } =
    useContext(ActionContext);

  const url = `/users/manager/getAllManagers?page=${page}&limit=${limit}`;

  const [suggestions, setSearchInput] = useSuggestions("users");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_managers", page],
    queryFn: async () => (await axios.get(url)).data,
    select: (data) => ({
      allManagers: data.data,
      count: data.count,
    }),
  });

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
    <div className="w-[80%] mx-auto mt-5 p-4 rounded-xl mb-6 animate-slide-down">
      <Header
        title="Manager Management"
        downloadFn={downloadXl}
        setSearchInput={setSearchInput}
        suggestions={suggestions}
        suggestionKey={"manager_email"}
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

      {data && !data.allManagers.length && (
        <p>
          <EmptyList rule={"Manager"} />
        </p>
      )}

      {data && data?.allManagers.length && !isLoading && (
        <HeaderTableManager managers={data.allManagers} />
      )}

      {data?.count > limit && (
        <Pagination listLength={data?.count} limit={limit} setPage={setPage} />
      )}
    </div>
  );
}

export default AllManagers;
