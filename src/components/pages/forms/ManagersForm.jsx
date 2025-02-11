import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActionContext } from "../../contexts/ActionContext";
// import { data } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { showSuccessToast, showErrorToast } from "../../../lib/Toast";
import InputField from "../../ui/InputField";
import CloseButton from "../../ui/CloseButton";

const initialValues = {
  manager_name: "",
  manager_email: "",
  manager_password: "",
};

function ManagerForm() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["edit manager"],
    mutationFn: async ({ values, id }) =>
      await axios.put(`users/manager/update/${id}`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_managers"] });
      document.getElementById("manager_modal").close();
      showSuccessToast("Manager updated successfully");
    },
    onError: (error) => {
      document.getElementById("manager_modal").close();
      showErrorToast("failed updating manager");
    },
  });

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
  const { man, mutateDelete } = useContext(ActionContext);
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState(null);

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handlesubmit(e) {
    e.preventDefault();
    try {
      man ? mutate({ values, id: man._id }) : addMutate(values);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!man) return setValues(initialValues);
    setValues({ ...man });
  }, [man]);

  return (
    <div className="bg-orange-50 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
        {!man ? "Add Managar" : man?.bySearch ? "View Manager" : "Edit Manager"}
      </h2>

      <form onSubmit={handlesubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              name="manager_name"
              type="text"
              placeholder="Enter first name"
              value={values?.manager_name}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              name="manager_email"
              type="email"
              placeholder="Enter email address"
              value={values?.manager_email}
              onChange={handleChange}
            />

            {(!man || user?.manager_email === values?.manager_email) && (
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
              !man && setValues(initialValues);
            }}
          />
          {man?.bySearch && (
            <button
              onClick={() => mutateDelete(man?._id)}
              type="button"
              className="px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-amber-600
            text-white rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {!man
              ? "Add Managar"
              : man?.bySearch
              ? "Edit Manager"
              : "Edit Manager"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManagerForm;
