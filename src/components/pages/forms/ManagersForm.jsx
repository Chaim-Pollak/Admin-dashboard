import { useContext, useEffect, useState } from "react";
import { ActionContext } from "../../contexts/ActionContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../../../lib/Toast";
import { AuthContext } from "../../contexts/AuthContext";
import CloseButton from "../../ui/CloseButton";

const initialValues = {
  manager_name: "",
  manager_email: "",
  manager_password: "",
};

function ManagerForm() {
  // Body OF Component run => useState implemented =>
  // useEffect for Side Effect when component Mounting =>
  // setState Values => rerender body of Component =>
  // setState Values when onChange Event triggered => rerender body of Component

  const queryClient = useQueryClient();

  const { manager } = useContext(ActionContext);
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState(null);

  const { mutate: addMutate } = useMutation({
    mutationKey: ["add_manager"],
    mutationFn: async (values) =>
      await axios.post(`users/manager/signup`, values),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["get_managers"] });
      document.getElementById("manager_modal").close();
      setValues(initialValues);
      showSuccessToast(msg.data.message);
    },
    onError: (error) => {
      document.getElementById("manager_modal").close();
      showErrorToast(error.response.data.error);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationKey: ["edit manager"],
    mutationFn: async ({ values, id }) =>
      await axios.put(`users/manager/update/${id}`, values),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["get_managers"] });
      document.getElementById("manager_modal").close();
      showSuccessToast(msg.data.message);
    },
    onError: (error) => {
      showErrorToast(error.response.data.message);
    },
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      manager ? editMutate({ values, id: manager._id }) : addMutate(values);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!manager) return setValues(initialValues);
    setValues({ ...manager });
  }, [manager]);

  return (
    <div className="bg-orange-50 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
        {manager ? "Edit Manager" : "Add Manager"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="manager_name"
              >
                Name
              </label>
              <input
                name="manager_name"
                id="manager_name"
                type="text"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter first name"
                value={values?.manager_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="manager_email"
              >
                Email
              </label>
              <input
                name="manager_email"
                id="manager_email"
                type="text"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter first name"
                value={values?.manager_email}
                onChange={handleChange}
              />
            </div>

            {(!manager || user?.manager_email === values?.manager_email) && (
              <div>
                <label
                  className="block text-sm font-medium text-amber-700 mb-1"
                  htmlFor="manager_password"
                >
                  Password
                </label>
                <input
                  name="manager_password"
                  id="manager_password"
                  type="password"
                  className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your password"
                  value={values?.manager_password}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <CloseButton
            modalId={"manager_modal"}
            onCancel={() => {
              !manager && setValues(initialValues);
            }}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {manager ? "Edit Manager" : "Add Manager"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManagerForm;
