import ManagerForm from "../pages/forms/ManagersForm";

function ModalManager() {
  return (
    <dialog id="manager_modal" className="modal">
      <ManagerForm />
    </dialog>
  );
}

export default ModalManager;
