import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SubmenuLink from "./SubmenuLink"; // Update the path to SubmenuLink.tsx

interface SideNavLinkProps {
  to: string;
  name: string;
  onClick: () => void;
  end?: boolean;
  submenu?: { to: string; name: string }[];
  children: React.ReactNode;
}

const SideNavLink: React.FC<SideNavLinkProps> = ({
  to,
  name,
  onClick,
  submenu,
  children,
  end,
  ...props
}) => {
  const { t } = useTranslation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <li
      className={`hover:text-primary text-center transition-all group-hover:transition-all mb-2 first-letter:`}
      {...props}
    >
      <NavLink
        onClick={submenu ? toggleSubMenu : onClick}
        to={to}
        end={end}
        className={(navData) => {
          if (navData.isActive) {
            return "py-2 text-center bg-primary flex flex-row font-bold text-white border-r-4 border-r-primary";
          }
          return `flex flex-row py-2 text-white ${
            navData.isActive ? "navActive" : ""
          }`;
        }}
      >
        {children}
        <span className="text-base">{t(name)}</span>
        {submenu && (
          <span className="ml-auto">
            {isSubMenuOpen ? (
              <FaAngleUp className="w-5 mt-1 mr-2  text-dark-text-fill" />
            ) : (
              <FaAngleDown className="w-5 mt-1 mr-2  text-dark-text-fill" />
            )}
          </span>
        )}
      </NavLink>
      {isSubMenuOpen && submenu && (
        <ul
          className={`flex flex-col ml-3 border-l-4  bg-gray-900 transition-all duration-75 ease-in-out`}
        >
          {submenu.map((submenuItem) => (
            <SubmenuLink
              key={submenuItem.to}
              to={submenuItem.to}
              name={submenuItem.name}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SideNavLink;
