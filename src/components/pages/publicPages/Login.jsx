import React from "react";
import LoginForm from "../forms/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-amber-900 tracking-tight">
          Welcome Back
        </h2>

        <LoginForm />
        <div className="mt-8 text-center">
          <a
            href="#"
            className="cursor-not-allowed text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors duration-200"
            aria-disabled={"true"}
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
