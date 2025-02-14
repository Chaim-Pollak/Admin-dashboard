import React, { useContext } from "react";
import RowTableProfession from "./RowTableProfession";
import { ActionContext } from "../../../contexts/ActionContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AddButton from "../../../ui/AddButton";
import { showSuccessToast, showErrorToast } from "../../../../lib/Toast";

function HeaderTableProfessions({ professions }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: "delete_profession",
    mutationFn: async (id) =>
      axios.delete(`/professions/deleteProfession/${id}`),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["get_professions"] });
      showSuccessToast(msg.data.message);
    },
    onError: (error) => {
      showErrorToast(error.response.data.message);
    },
  });

  const { handleAddProfession } = useContext(ActionContext);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[50%] m-auto mt-6">
      <div className="px-6 py-4 bg-amber-50 border-b border-amber-200 flex justify-items-start items-center">
        <AddButton
          onClick={() => handleAddProfession()}
          type="button"
          name="Add Profession"
        />
        <h2 className="text-2xl font-semibold text-amber-950 ml-20">
          Professions List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-amber-200">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                Profession
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-amber-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-amber-100">
            {professions.map((profession) => (
              <RowTableProfession
                key={profession._id}
                profession={profession}
                mutate={mutate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HeaderTableProfessions;
