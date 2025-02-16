import { useFormik } from "formik";
import { LoginSchema } from "../../../schema/Index";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function LoginForm() {
  const { handleLogin } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      manager_email: "",
      manager_password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleLogin(values);
      resetForm();
    },
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      {/* email input */}
      <div className="space-y-2">
        <label
          htmlFor="manager_email"
          className="block text-sm font-semibold text-amber-800 tracking-wide"
        >
          Email
        </label>
        <div className="relative">
          <input
            id="manager_email"
            name="manager_email"
            type="email"
            className="block w-full pl-10 rounded-xl border-2 border-amber-200 bg-amber-50 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            placeholder="Enter your email"
            required
            {...formik.getFieldProps("manager_email")}
          />
          {formik.touched.manager_email && formik.errors.manager_email && (
            <p className="text-red-500 text-base font-semibold">
              {formik.errors.manager_email}
            </p>
          )}
        </div>
      </div>

      {/* password input */}
      <div className="space-y-2">
        <label
          htmlFor="manager_password"
          className="block text-sm font-semibold text-amber-800 tracking-wide"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="manager_password"
            name="manager_password"
            type="password"
            className="block w-full pl-10 rounded-xl border-2 border-amber-200 bg-amber-50 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            placeholder="Enter your password"
            required
            {...formik.getFieldProps("manager_password")}
          />
          {formik.touched.manager_password &&
            formik.errors.manager_password && (
              <p className="text-red-500 text-base font-semibold">
                {formik.errors.manager_password}
              </p>
            )}
        </div>
      </div>

      {/* submit */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-amber-600 text-white rounded-xl py-3 px-4 font-semibold hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
      >
        {formik.isSubmitting ? "inProcess..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
