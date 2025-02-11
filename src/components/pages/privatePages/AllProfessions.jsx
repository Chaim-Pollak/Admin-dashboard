import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProfessionsTable from "../tables/professions/ProfessionsTable";
import Pagination from "../../ui/Pagination";
import WaveLoader from "../../ui/WaveLoader";

function AllProfessions() {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const url = `/professions/getAllProfessions?page=${page}&limit=${limit}`;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_professions", page],
    queryFn: async () => (await axios.get(url)).data,
    select: (data) => ({
      AllProfession: data.data,
      count: data.count,
    }),
  });

  useEffect(() => {
    if (data) {
      console.log("All Professions:", data.AllProfession);
      console.log("Count:", data.count);
    }
  }, [data]);

  return (
    <div className="w-[90%] mx-auto">
      {isLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <WaveLoader />
        </div>
      )}

      {isError && <div>{error}</div>}
      {data && !data?.AllProfession.length && (
        <p>No Categories Yet, please add Categories</p>
      )}
      {data && data?.AllProfession.length && !isLoading && (
        <ProfessionsTable professions={data.AllProfession} />
      )}
      {data?.count > limit && (
        <Pagination listLength={data?.count} limit={limit} setPage={setPage} />
      )}
    </div>
  );
}

export default AllProfessions;
