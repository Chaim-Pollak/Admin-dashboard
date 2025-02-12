import ProfessionForm from "../pages/forms/ProfessionForm";

function modalAddProfession() {
  return (
    <dialog id="profession_modal" className="modal">
      <ProfessionForm />
    </dialog>
  );
}

export default modalAddProfession;
