import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ChartPieIcon } from "@heroicons/react/24/solid";
import { CogIcon } from "@heroicons/react/24/outline";
import {
  FaChartBar,
  FaFileArchive,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { AiFillCalendar, AiFillProject } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import {
  HiDocumentCheck,
  HiPresentationChartLine,
  HiUsers,
} from "react-icons/hi2";

import Tooltip from "./ToolTip";
import { UserContext } from "../hooks/useAuth";
import CheckRole from "../utils/checkRoles";
import SideNavLink from "./SideNavLink";
import { FaChartArea, FaMoneyBill } from "react-icons/fa6";

function Sidebar({ style, toggle }: { style: string; toggle: () => void }) {
  const { logout } = useContext(UserContext);

  return (
    <div
      className={`${style} flex-col fixed h-[100%] w-1/5 md:w-[13%] pt-[3vh] lg:pt-[11vh] bg-dark-bg dark:bg-dark-bg border-r`}
    >
      <div className="list-none mt-12">
        <SideNavLink onClick={toggle} name="Dashboard" to="/dashboard/">
          <ChartPieIcon className="w-5 mr-2 " />
        </SideNavLink>
        {/* Admin */}

        <CheckRole roles={["ADMIN"]}>
          <SideNavLink onClick={toggle} name="Users" to="/dashboard/users">
            <FaUsers className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>
        {/* PM And Employee */}
        <CheckRole roles={["PM", "EMPLOYEE"]}>
          <SideNavLink
            onClick={toggle}
            end={false}
            name="Projects"
            to="/dashboard/project"
          >
            <AiFillProject className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink onClick={toggle} name="Tasks" to="/dashboard/tasks">
            <HiDocumentCheck className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>
        {/* PM */}
        <CheckRole roles={["PM"]}>
          <SideNavLink
            onClick={toggle}
            name="Documents"
            to="/dashboard/documents"
          >
            <FaFileArchive className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>
        {/* FM */}
        <CheckRole roles={["FM"]}>
          <SideNavLink
            onClick={toggle}
            name="Budget"
            to="/dashboard/budget"
            end={true}
            submenu={[
              { to: "/dashboard/budget/create", name: "Create Budget" },
            ]}
          >
            <FaChartArea className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>

          <SideNavLink
            onClick={toggle}
            name="Expenses"
            to="/dashboard/expenses"
          >
            <FaChartBar className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Income"
            to="/dashboard/income"
            end={true}
            // submenu={[
            //   { to: "/dashboard/income/allocate", name: "Allocate income" },
            // ]}
          >
            <HiPresentationChartLine className="w-5 mt-1 mr-2 text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Payroll"
            to="/dashboard/payroll"
            end={true}
            submenu={[{ to: "/dashboard/payroll/report", name: "Reports" }]}
          >
            <FaMoneyBill className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Donors"
            to="/dashboard/donors"
            end={true}
            submenu={[{ to: "/dashboard/donors/manage", name: "Add Donor" }]}
          >
            <FiUsers className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>
        {/* HR */}
        <CheckRole roles={["HR"]}>
          <SideNavLink
            onClick={toggle}
            name="Employees"
            to="/dashboard/employees"
          >
            <HiUsers className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Volunteers"
            to="/dashboard/volunteers"
          >
            <FaUsers className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Payroll"
            to="/dashboard/payroll"
            end={true}
            submenu={[
              { to: "/dashboard/payroll/request", name: "Request Payment" },
            ]}
          >
            <FaMoneyBill className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>
        {/* Regular User */}

        <CheckRole roles={["HR", "EMPLOYEE"]}>
          <SideNavLink
            onClick={toggle}
            name="Attendance"
            to="/dashboard/attendance"
          >
            <AiFillCalendar className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink onClick={toggle} name="Leave" to="/dashboard/leave">
            <FiUsers className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>

        {/* Shared Links */}
        <SideNavLink onClick={toggle} name="Settings" to="/dashboard/settings">
          <CogIcon className="w-5 mr-2 text-dark-text-fill" />
        </SideNavLink>
      </div>
      <hr className="mt-auto  mb-0" />
      <div className="flex pt-4 flex-row ml-10  mb-10 list-none">
        <li className="px-2">
          <NavLink to="#link">
            <Tooltip message="Logout">
              <FaSignOutAlt
                onClick={logout}
                className="w-5 text-red-700 dark:text-red-600 hover:text-red-900"
              />
            </Tooltip>
          </NavLink>
        </li>
        <li className="px-2">
          <NavLink
            to="/dashboard/settings"
            className={(navData) => {
              if (navData.isActive) {
                return "flex flex-row font-bold text-primary dark:text-primary";
              }
              return "flex flex-row dark:text-dark-text-fill";
            }}
          >
            <Tooltip message="Settings">
              <CogIcon className="w-5 hover:text-primary text-dark-text-fill" />
            </Tooltip>
          </NavLink>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
