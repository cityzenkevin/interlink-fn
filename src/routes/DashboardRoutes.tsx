/* eslint-disable */
import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../layouts/Sidebar";
import PrivateRoute from "../utils/ProtectedRoute";
import Square from "../components/Skeletons/Square";
import Dashboard from "../pages/Dashboards";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import EditProfile from "../sections/profile/profile-edit";
import Users from "../pages/evaluations/list";
import Students from "../pages/students/list";
import Internships from "../pages/internships/list";
import Evaluations from "../pages/evaluations/list";
import Supervisors from "../pages/supervisors/list";
import CreateInternship from "../pages/internships/create-internship";
import Applications from "../pages/applications/list";
import EditInternship from "../pages/internships/edit-internship";

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
            <Route path="/internships/:id/edit" element={<EditInternship />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/internships/create" element={<CreateInternship />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/evaluations" element={<Evaluations />} />
            <Route path="/supervisors" element={<Supervisors />} />
          </Routes>
        </Suspense>
      </div>
    </PrivateRoute>
  );
}

export default DashboardRoutes;
