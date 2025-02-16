import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/contexts/AuthContext";

import NavAdmin from "./components/section/NavAdmin";
import NavPublic from "./components/section/NavPublic";
import BackgroundLayout from "./components/ui/backgroundLayout";

import EmployeeModal from "./components/modals/EmployeeModal";
import ManagerModal from "./components/modals/ManagerModal";
import ProfessionModal from "./components/modals/ProfessionModal";
import IssueModal from "./components/modals/IssueModal";

const ProtectedRoute = ({ isAuth }) =>
  isAuth ? <Outlet /> : <Navigate to="/" replace />;

function Root({ isAuth }) {
  return (
    <>
      <BackgroundLayout>
        {isAuth ? <NavAdmin /> : <NavPublic />}
        <Outlet />

        <IssueModal />
        <EmployeeModal />
        <ManagerModal />
        <ProfessionModal />
      </BackgroundLayout>
    </>
  );
}

function App() {
  const { isAuth, user } = useContext(AuthContext);
  const isManagerOrAdmin =
    user?.permission?.includes("Admin") ||
    user?.permission?.includes("Manager");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>
        {/* Public Routes */}
        <Route element={isAuth ? <Navigate to={"/welcomePage"} /> : <Outlet />}>
          <Route
            index
            lazy={async () => ({
              Component: (
                await import("./components/pages/publicPages/mainPage/HomePage")
              ).default,
            })}
          />
          <Route
            path="login"
            lazy={async () => ({
              Component: (await import("./components/pages/publicPages/Login"))
                .default,
            })}
          />
        </Route>

        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route
            path="welcomePage"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/WelcomePage")
              ).default,
            })}
          />

          {/* Private Routes */}
          {isAuth &&
            (user?.permission === "Admin" ||
              user?.permission === "Manager") && (
              <Route
                path="allEmployees"
                lazy={async () => ({
                  Component: (
                    await import("./components/pages/privatePages/AllEmployees")
                  ).default,
                })}
              />
            )}

          <Route
            path="Professions"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/AllProfessions")
              ).default,
            })}
          />
          <Route
            path="addProfession"
            lazy={async () => ({
              Component: (
                await import("./components/pages/forms/ProfessionForm")
              ).default,
            })}
          />
          <Route
            path="allManagers"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/AllManagers")
              ).default,
            })}
          />
          <Route
            path="addIssue"
            lazy={async () => ({
              Component: (await import("./components/pages/forms/IssueForm"))
                .default,
            })}
          />
          <Route
            path="allIssues"
            lazy={async () => ({
              Component: (await import("./components/cards/CardIssues"))
                .default,
            })}
          />
          <Route
            path="issuesHistory"
            lazy={async () => ({
              Component: (await import("./components/cards/IssuesHistory"))
                .default,
            })}
          />
        </Route>
        {/* some routes */}
        <Route
          path="LeadershipTeam"
          lazy={async () => ({
            Component: (
              await import(
                "./components/pages/publicPages/mainPage/LeadershipTeam"
              )
            ).default,
          })}
        />
        <Route
          path="AboutPage"
          lazy={async () => ({
            Component: (
              await import("./components/pages/publicPages/mainPage/AboutPage")
            ).default,
          })}
        />
        <Route
          path="ContactPage"
          lazy={async () => ({
            Component: (
              await import(
                "./components/pages/publicPages/mainPage/ContactPage"
              )
            ).default,
          })}
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
