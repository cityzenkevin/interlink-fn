import { Routes, Route } from "react-router-dom";


import Error from "../pages/Error";
import DashboardRoutes from "./DashboardRoutes";
import { EditPassword } from "../pages/ResetPassword";
import LandingPage from "../pages/landing-page/landing-page";
import LandingInternships from "../pages/internships/Internships";
import SingleInternship from "../pages/internships/SingleInternship";
import Activate from "../pages/auth/Activate";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassord from "../pages/auth/ResetPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function MainRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Suspense fallback={<Skeleton />}> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/internships" element={<LandingInternships />} />
        <Route path="/internships/:id" element={<SingleInternship />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path = '/activate' element={<Activate />} />
        <Route path = '/forgot-password' element={<ForgotPassword />} />
        <Route path = '/reset-password' element={<ResetPassord />} />
        <Route path="/password/reset" element={<EditPassword />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </Suspense> */}
    </div>
  );
}

export default MainRoutes;