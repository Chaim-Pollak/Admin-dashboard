import EditEmployeeForm from "../pages/forms/EmployeeForm";

function EmployeeModal() {
  return (
    <dialog id="employee_modal" className="modal">
      <EditEmployeeForm />
    </dialog>
  );
}

export default EmployeeModal;
