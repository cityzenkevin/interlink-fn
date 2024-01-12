/* eslint-disable */
import { useState } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from "../layouts/Sidebar";
import ProfileDropdown from "./ProfileDropdown";
import { AiOutlineUser } from "react-icons/ai";

function DashHeader() {
  const [showProfileDropdown, setShowprofileDropdown] = useState(false);
  
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const handleShowProfileDropdown = () =>
    setShowprofileDropdown(!showProfileDropdown);

  const user = JSON.parse(localStorage.getItem("auth") || "{}");

  return (
    <>
      {showProfileDropdown && (
        <ProfileDropdown
          handleShowProfileDropdown={handleShowProfileDropdown}
        />
      )}
      <div className="w-screen h-[8vh] z-10 bg-gray-50  dark:bg-dark-bg fixed border-b">
        <div className="px-3 flex items-center  w-full h-full">
          <div className="flex px-5 lg:hidden">
            <div
              onClick={handleClick}
              onKeyDown={handleClick}
              role="button"
              tabIndex={0}
            >
              {!nav ? (
                <XMarkIcon className="w-7 dark:text-dark-text-fill" />
              ) : (
                <XMarkIcon className="w-7 dark:text-dark-text-fill" />
              )}
            </div>
          </div>
          <div className="flex items-center  lg:w-full">
            <Link to="/" className="flex flex-row lg:px-5">
              {/* <img
                className="cursor-pointer w-60  -mr-20 bg-gray-400"
                src={Logo}
                alt="logo"
              /> */}
              <h1 className="text-lg mt-2 font-bold font-lexend text-primary dark:text-dark-text-fill">
                Internship Offer Management System
              </h1>
            </Link>
          </div>
           
          <div onClick={handleShowProfileDropdown} className="ml-auto mr-2 flex justify-center items-center">
            <span className="mr-2 text-lg font-semibold cursor-pointer">
               {user.firstname}
            </span>
            <div className="rounded-full   mr-2"> 
            <AiOutlineUser className=" mt-1"/>
            </div>
            {/* <img
              className="w-8 cursor-pointer mr-auto"
              src={Avatar}
              alt="avatar"
            /> */}
          </div>
        </div>
        <ul
          className={
            !nav
              ? "hidden"
              : "bg-white dark:bg-dark-bg cursor-pointer lg:hidden"
          }
        >
          <Sidebar toggle={handleClick} style="flex  pt-2 h-[92%]" />
        </ul>
      </div>
    </>
  );
}

export default DashHeader;
