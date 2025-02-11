import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from "../../lib/Toast";
import ActionProvider from "./ActionContext";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  async function handleLogin(values) {
    try {
      const { data } = await axios.post("/users/manager/signin", values);
      if (data.success) {
        showSuccessToast(data.message);
        setIsAuth(true);
        setUser(data.data);
        return true;
      }
    } catch (error) {
      const msg = error.response.data.error;
      showErrorToast(msg);
      return false;
    }
  }

  async function authUser() {
    try {
      const { data } = await axios.get("/users/auth");

      if (data.success) {
        setIsAuth(true);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    authUser();
  }, []);

  async function handleManager(values) {
    try {
      const { data } = await axios.post("/users/manager/signup", values);
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function handleEmployee(values) {
    try {
      const { data } = await axios.post("/users/employee/signup", values);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function signOut() {
    try {
      const { data } = await axios.get("/users/logout");
      window.location.href = "/login";
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    isAuth,
    handleLogin,
    handleEmployee,
    handleManager,
    user,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      <ActionProvider>{children}</ActionProvider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
