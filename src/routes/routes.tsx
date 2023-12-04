import { Routes, Route } from "react-router-dom";
import Home from "../pages/Homepage";


import Login from "../pages/Login";
import Error from "../pages/Error";
import DashboardRoutes from "./DashboardRoutes";

function MainRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Suspense fallback={<Skeleton />}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </Suspense> */}
    </div>
  );
}

export default MainRoutes;