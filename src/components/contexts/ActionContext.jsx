import axios from "axios";
import { createContext, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../lib/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const ActionContext = createContext();

function ActionProvider({ children }) {
  const [toggleRequest, setToggleRequest] = useState(false);
  const [emp, setEmp] = useState(null);
  const [man, setMan] = useState(null);
  const [iss, setIss] = useState(null);

  const queryClient = useQueryClient();

  function handleEditEmployee(employee) {
    document.getElementById("employee_modal").showModal();
    setEmp(employee);
  }

  function handleAddEmployee() {
    document.getElementById("employee_modal").showModal();
    setEmp(null);
  }

  function handleEditManager(manager) {
    document.getElementById("manager_modal").showModal();
    setMan(manager);
  }

  function handleAddManager() {
    document.getElementById("manager_modal").showModal();
    setMan(null);
  }

  async function getAllDetails(url) {
    try {
      const { data } = (await axios.get(url)).data;

      return data;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  function handleAddIssue() {
    document.getElementById("issue_modal").showModal();
    setIss(null);
  }

  function handleEditIssue(issue) {
    document.getElementById("issue_modal").showModal();
    setIss(issue);
  }

  function handleAddProfession() {
    document.getElementById("profession_modal").showModal();
    setMan(null);
  }

  const { mutate: mutatePutInHistory } = useMutation({
    //
    mutationKey: ["put_in_history"],
    mutationFn: async (id) =>
      await axios.post(`issues/deleteAndArchiveIssue/${id}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_issues"] });
    },
    onError: () => {},
  });

  const value = {
    toggleRequest,
    setToggleRequest,
    emp,
    handleEditEmployee,
    handleEditManager,
    man,
    handleAddManager,
    getAllDetails,
    handleAddIssue,
    handleEditIssue,
    iss,
    setIss,
    handleAddProfession,
    handleAddEmployee,
    mutatePutInHistory,
  };

  return (
    <ActionContext.Provider value={value}>{children}</ActionContext.Provider>
  );
}

export default ActionProvider;
