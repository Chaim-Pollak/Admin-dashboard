import { createContext, useState } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../lib/Toast";

export const ActionContext = createContext();

function ActionProvider({ children }) {
  const [manager, setManagerData] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [activeIssue, setActiveIssue] = useState(null);

  function handleAddEmployee() {
    document.getElementById("employee_modal").showModal();
    setEmployee(null);
  }

  function handleEditEmployee(employee) {
    document.getElementById("employee_modal").showModal();
    setEmployee(employee);
  }

  function handleAddManager() {
    document.getElementById("manager_modal").showModal();
    setManagerData(null);
  }

  function handleEditManager(manager) {
    document.getElementById("manager_modal").showModal();
    setManagerData(manager);
  }

  function handleAddIssue() {
    document.getElementById("issue_modal").showModal();
    setActiveIssue(null);
  }

  function handleEditIssue(issue) {
    document.getElementById("issue_modal").showModal();
    setActiveIssue(issue);
  }

  function handleAddProfession() {
    document.getElementById("profession_modal").showModal();
    setManagerData(null); //TODO why we need this
  }

  //   function for XL export
  async function getAllDetails(url) {
    try {
      const { data } = (await axios.get(url)).data;

      return data;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  const value = {
    manager,
    employee,
    activeIssue,
    setActiveIssue,
    handleAddEmployee,
    handleEditEmployee,
    handleAddManager,
    handleEditManager,
    handleAddIssue,
    handleEditIssue,
    handleAddProfession,
    getAllDetails,
  };

  return (
    <ActionContext.Provider value={value}>{children}</ActionContext.Provider>
  );
}

export default ActionProvider;
