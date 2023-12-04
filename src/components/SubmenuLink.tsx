import React from "react";
import { NavLink } from "react-router-dom";

interface SubmenuLinkProps {
  to: string;
  name: string;
}

const SubmenuLink: React.FC<SubmenuLinkProps> = ({ to, name }) => {
  return (
    <li className="hover:text-primary transition-all ">
      <NavLink
        to={to}
        className={(navData) => {
          if (navData.isActive) {
            return "py-2  flex flex-row  text-white  bg-primary ";
          }
          return `flex flex-row py-2 text-white`;
        }}
      >
        <span className="ml-1">{name}</span>
      </NavLink>
    </li>
  );
};

export default SubmenuLink;
