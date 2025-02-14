import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeaderTableProfessions from "../tables/professions/HeaderTableProfessions";
import Pagination from "../../ui/Pagination";
import WaveLoader from "../../ui/WaveLoader";
import EmptyList from "../../ui/EmptyList";

function AllProfessions() {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const url = `/professions/getAllProfessions?page=${page}&limit=${limit}`;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_professions", page],
    queryFn: async () => (await axios.get(url)).data,
    select: (data) => ({
      allProfession: data.data,
      count: data.count,
    }),
  });

  return (
    <div className="w-[90%] mx-auto">
      {isLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <WaveLoader />
        </div>
      )}

      {isError && <div>{error}</div>}

      {data && !data?.allProfession.length && (
        <p>
          <EmptyList rule={"Profession"} />
        </p>
      )}

      {data && data?.allProfession.length && !isLoading && (
        <HeaderTableProfessions professions={data.allProfession} />
      )}

      {data?.count > limit && (
        <Pagination listLength={data?.count} limit={limit} setPage={setPage} />
      )}
    </div>
  );
}

export default AllProfessions;
