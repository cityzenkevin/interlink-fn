import { Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Error from "../pages/Error";
import DashboardRoutes from "./DashboardRoutes";
import Register from "../pages/Register";
import { EditPassword } from "../pages/ResetPassword";
import LandingPage from "../pages/landing-page/landing-page";

function MainRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Suspense fallback={<Skeleton />}> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/password/reset" element={<EditPassword />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </Suspense> */}
    </div>
  );
}

export default MainRoutes;