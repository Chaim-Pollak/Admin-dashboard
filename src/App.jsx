import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import NavAdmin from "./components/section/NavAdmin";
import NavPublic from "./components/section/NavPublic";
import { AuthContext } from "./components/contexts/AuthContext";

import EmployeeModal from "./components/modals/employeeModal";
import ModalManager from "./components/modals/ModalManager";
import ModalAddProfession from "./components/modals/modalAddProfession";

import BackgroundLayout from "./components/ui/backgroundLayout";
import IssueModal from "./components/modals/IssueModal";

function ProtectedRoute({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}

function Root({ isAuth }) {
  return (
    <>
      <BackgroundLayout>
        {isAuth ? <NavAdmin /> : <NavPublic />}
        <Outlet />
        <IssueModal />
        <EmployeeModal />
        <ModalManager />
        <ModalAddProfession />
      </BackgroundLayout>
    </>
  );
}

function App() {
  const { isAuth, user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>
        {/* Public Routes */}
        <Route element={isAuth ? <Navigate to={"/welcomepage"} /> : <Outlet />}>
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
            path="welcomepage"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/WelcomePage")
              ).default,
            })}
          />

          {/* Private Routes */}
          {isAuth && user?.permission === "Admin" && (
            <Route
              path="allemployees"
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
            path="allmanagers"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/AllManagers")
              ).default,
            })}
          />
          <Route
            path="addissue"
            lazy={async () => ({
              Component: (await import("./components/pages/forms/IssueForm"))
                .default,
            })}
          />
          <Route
            path="allissues"
            lazy={async () => ({
              Component: (await import("./components/cards/CardIssues"))
                .default,
            })}
          />
          <Route
            path="issueshistory"
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
        <Route
          path="Offices"
          lazy={async () => ({
            Component: (
              await import("./components/pages/publicPages/mainPage/Offices")
            ).default,
          })}
        />

        {/* <Route path="*" element={<Navigate to="/" replace />} />
        {/* </Routh> */}
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
