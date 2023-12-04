/* eslint-disable */
import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/Sidebar";
import PrivateRoute from "../utils/ProtectedRoute";
import Square from "../components/Skeletons/Square";
import Dashboard from "../pages/Dashboards";
import Settings from "../pages/Settings";
import Subjects from "../pages/Employees";
import Profile from "../pages/Profile";
import EditProfile from "../pages/ProfileEdit";
import Users from "../pages/Users/Users";
import Volunteers from "../pages/Volunteers";
import Leaves from "../pages/Leaves";
import Attendance from "../pages/Attendance";
import Projects from "../pages/Projects";
import AddProject from "../pages/Projects/AddProject";
import Documents from "../pages/Projects/Documents";
import Budgets from "../pages/Finance/Budget";
import CreateBudget from "../pages/Finance/Budget/CreateBudget";
import Tasks from "../pages/Projects/Tasks";
import AllocateBudget from "../pages/Finance/Budget/AllocateBudget";
import Expenses from "../pages/Finance/Expenses";
import Donors from "../pages/Donors";
import Income from "../pages/Finance/Income";
import AddDonor from "../pages/Donors/AddDonor";
import AllocateIncome from "../pages/Finance/Income/AllocateIncome";
import RecordAttendance from "../pages/Attendance/RecordAttendance";
import RequestPayment from "../pages/Employees/Payroll/RequestPayment";
import Payroll from "../pages/Employees/Payroll";
import PayrollReport from "../pages/Employees/Payroll/PayrollReport";
import TerminatedEmployees from "../pages/Employees/TerminatedEmployees";
import EditEmployee from "../pages/Employees/EditEmployee";
import EditProject from "../pages/Projects/EditProject";
import Allocations from "../pages/Finance/Budget/Allocations";

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
            <Route path="/employees" element={<Subjects />} />
            <Route path="/employees/:id" element={<EditEmployee />} />

            <Route
              path="/employees/terminated"
              element={<TerminatedEmployees />}
            />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/leave" element={<Leaves />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/project/:id" element={<EditProject />} />
            <Route path="/project/add" element={<AddProject />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/budget" element={<Budgets />} />
            <Route path="/budget/create" element={<CreateBudget />} />
            <Route path="/budget/allocations" element={<Allocations />} />
            <Route path="/budget/allocate" element={<AllocateBudget />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/donors/manage" element={<AddDonor />} />
            <Route path="/income" element={<Income />} />
            <Route path="/income/allocate" element={<AllocateIncome />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/payroll/request" element={<RequestPayment />} />
            <Route path="/payroll/report" element={<PayrollReport />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/record" element={<RecordAttendance />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>
    </PrivateRoute>
  );
}

export default DashboardRoutes;
