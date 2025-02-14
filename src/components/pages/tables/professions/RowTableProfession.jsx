import { Trash2 } from "lucide-react";
import React from "react";

function RowTableProfession({ mutate, profession }) {
  const { _id, profession_name } = profession;

  return (
    <tr className="hover:bg-amber-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
        {profession_name}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
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

export default RowTableProfession;
