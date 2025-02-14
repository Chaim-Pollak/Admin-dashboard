import { useContext } from "react";
import { ActionContext } from "../../../contexts/ActionContext";
import { Pencil, Trash2 } from "lucide-react";

function RowTableManager({ manager, mutate }) {
  const { _id, manager_name, manager_email } = manager;
  const { handleEditManager } = useContext(ActionContext);

  return (
    <tr className="hover:bg-amber-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
        {manager_name}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
        {manager_email}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
        *********
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <button
          onClick={() => handleEditManager(manager)}
          className="text-amber-600 hover:text-amber-900 font-medium px-3 py-1 rounded-lg hover:bg-amber-100 transition-colors duration-200 mr-2"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => mutate(_id)}
          className="text-red-600 hover:text-red-900 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}

export default RowTableManager;
