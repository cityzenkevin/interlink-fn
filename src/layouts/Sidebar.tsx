import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ChartPieIcon } from "@heroicons/react/24/solid";
import { CogIcon } from "@heroicons/react/24/outline";
import {
  FaFileArchive,
  FaFileSignature,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";

import Tooltip from "../components/ToolTip";
import { UserContext } from "../hooks/useAuth";
import CheckRole from "../utils/checkRoles";
import SideNavLink from "../components/SideNavLink";
import { AiOutlineUserAdd, AiOutlineUserSwitch } from "react-icons/ai";
import { HiDocument, HiUsers } from "react-icons/hi2";

function Sidebar({ style, toggle }: { style: string; toggle: () => void }) {
  const { logout } = useContext(UserContext);

  return (
    <div
      className={`${style} flex-col fixed h-[100%] w-1/5 md:w-[13%] pt-[3vh] lg:pt-[11vh] bg-dark-bg  border-r`}
    >
      <div className="list-none mt-12">
        <SideNavLink onClick={toggle} name="Dashboard" to="/dashboard/">
          <ChartPieIcon className="w-5 mr-2 " />
        </SideNavLink>
        {/* Admin */}

        <CheckRole roles={["ADMIN"]}>
          <SideNavLink
            onClick={toggle}
            name="Students"
            to="/dashboard/students"
          >
            <HiUsers className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Supervisors"
            to="/dashboard/supervisors"
          >
            <FaUserAlt className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>

        {/* STUDENTS */}
        {/* <CheckRole roles={["STUDENT"]}>
        
        </CheckRole> */}

        {/* ORGANIZAITONS & STUDENTS */}

        <CheckRole roles={["ADMIN", "STUDENT"]}>
          <SideNavLink
            onClick={toggle}
            name="Internships"
            to="/dashboard/internships"
          >
            <FaFileSignature className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Applications"
            to="/dashboard/applications"
          >
            <FaFileArchive className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>
        <CheckRole roles={["ADMIN", "SUPERVISOR", "STUDENT"]}>
          <SideNavLink
            onClick={toggle}
            name="Evaluations"
            to="/dashboard/evaluations"
          >
            <HiDocument className="w-5 mt-1 mr-2  text-dark-text-fill" />
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
