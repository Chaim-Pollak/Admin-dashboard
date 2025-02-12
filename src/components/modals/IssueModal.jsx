import IssueForm from "../pages/forms/IssueForm";

function IssueModal() {
  return (
    <dialog id="issue_modal" className="modal">
      <IssueForm />
    </dialog>
  );
}

export default IssueModal;
