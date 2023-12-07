/* eslint-disable */
import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../layouts/Sidebar";
import PrivateRoute from "../utils/ProtectedRoute";
import Square from "../components/Skeletons/Square";
import Dashboard from "../pages/dashboards";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import EditProfile from "../pages/ProfileEdit";
import Users from "../pages/users/list";
import Students from "../pages/students/list";
import Internships from "../pages/internships/list";
import Organizations from "../pages/organizations/list";

function DashboardRoutes() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <PrivateRoute>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <Sidebar toggle={handleClick} style="hidden lg:flex" />
        <Suspense fallback={<Square />}>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/students" element={<Students />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/organization" element={<Organizations />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>
    </PrivateRoute>
  );
}

export default DashboardRoutes;
