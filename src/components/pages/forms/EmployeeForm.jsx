import { useContext, useEffect, useState } from "react";
import { ActionContext } from "../../contexts/ActionContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../lib/Toast";
import ProfessionSelectBox from "./ProfessionSelectBox";
import CloseButton from "../../ui/CloseButton";

const initialValues = {
  employeeName: "",
  employeeEmail: "",
  employeePassword: "",
  employeeId: "",
};

function EmployeeForm() {
  // Body OF Component run => useState implemented =>
  // useEffect for Side Effect when component Mounting =>
  // setState Values => rerender body of Component =>
  // setState Values when onChange Event triggered => rerender body of Component

  const queryClient = useQueryClient();

  const { employee } = useContext(ActionContext);
  const [values, setValues] = useState(null);

  const { mutate: addMutate } = useMutation({
    mutationKey: ["add_employee"],
    mutationFn: async (values) =>
      await axios.post(`users/employee/signup`, values),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["get_employees"] });
      document.getElementById("employee_modal").close();
      setValues(initialValues);
      showSuccessToast(msg.data.message);
    },
    onError: (error) => {
      document.getElementById("employee_modal").close();
      showErrorToast(error.response.data.message);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationKey: ["edit employee"],
    mutationFn: async ({ values, id }) =>
      await axios.put(`users/employee/update/${id}`, values),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["get_employees"] });
      document.getElementById("employee_modal").close();
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      employee ? editMutate({ values, id: values?._id }) : addMutate(values);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!employee) return setValues(initialValues);
    setValues({ ...employee });
  }, [employee]);

  return (
    <div className="bg-orange-50 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeeName"
              >
                Name
              </label>
              <input
                name="employeeName"
                id="employeeName"
                type="text"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter first name"
                value={values?.employeeName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeeEmail"
              >
                Email
              </label>
              <input
                name="employeeEmail"
                id="employeeEmail"
                type="text"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter email address"
                value={values?.employeeEmail}
                onChange={handleChange}
              />
            </div>

            {!employee && (
              <div>
                <label
                  className="block text-sm font-medium text-amber-700 mb-1"
                  htmlFor="employeePassword"
                >
                  Password
                </label>
                <input
                  name="employeePassword"
                  id="employeePassword"
                  type="text"
                  className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter password"
                  value={values?.employeePassword}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="profession"
              >
                Profession
              </label>
              <ProfessionSelectBox
                value={values?.employeeId?._id || values?.employeeId}
                handleChange={handleChange}
                placeholder="Select Profession"
                id={"employeeId"}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <CloseButton
            modalId={"employee_modal"}
            onCancel={() => {
              !employee && setValues(initialValues);
            }}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {employee ? "Edit Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
