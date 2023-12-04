import { PhoneIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { formatDateInWords } from "../utils";
import {
  AiFillBank,
  AiFillBuild,
  AiFillCalendar,
  AiFillMoneyCollect,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { HiUsers } from "react-icons/hi2";
import { EditPassword } from "./ResetPassword";

const roles = {
  ADMIN: "ADMIN",
  HR: "Human Resource",
  FM: "Finance Manager",
  PM: "Project Manager",
  EMPLOYEE: "Employee",
};

type RoleName = "ADMIN" | "HR" | "FM" | "PM" | "EMPLOYEE";

export default function ProfileTabs({ data }: any) {
  const [openTab, setOpenTab] = useState("About");
  const { t } = useTranslation();
  const roleName: RoleName = data?.role;
  const loggedInUser = JSON.parse(localStorage.getItem("auth") || "{}");
  let tabs: Array<string> = ["About"];
  if (loggedInUser?.id == data?.id) {
    tabs.push("Account");
  }

  return (
    <div className="flex flex-wrap lg:ml-60 lg:mr-8">
      <>
        <div className="lg:w-[40vw]">
          {/* Profile tabs option start */}
          <ul
            className="flex border-2 mb-0 list-none flex-wrap  flex-row text-black dark:text-dark-text-fill"
            role="tablist"
          >
            {tabs.map((tab) => (
              <li
                key={tab}
                className="-mb-px mr-2 last:mr-0 flex-auto text-center"
              >
                <a
                  className={`text-xs font-bold border-b-4 uppercase px-3 md:px-5 py-3 shadow-sm  block leading-normal ${
                    openTab === `${tab}`
                      ? "bg-white dark:bg-dark-bg border-b-4 border-b-primary "
                      : "border-b-gray-50 "
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(`${tab}`);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                  data-testid="tab-link"
                >
                  {t(tab)}
                </a>
              </li>
            ))}
          </ul>
          {/* Profile tabs option end */}
        </div>
        <div className="relative flex flex-col min-w-0 break-words text-light-text dark:text-dark-text-fill  w-full rounded">
          <div className="py-2 flex-auto">
            <div className="tab-content tab-space">
              {/* About section start */}
              <div
                className={openTab === "About" ? "block" : "hidden"}
                id="link1"
              >
                <div className="grid md:grid-cols-5 gap-4 md:gap-6 ">
                  <div className="p-2 border flex flex-col md:col-span-2 justify-start items-start bg-white  dark:bg-dark-bg shadow ">
                    <h3 className="text-2xl font-bold m-2  mb-4">
                      {data?.firstname} {data?.lastname}
                    </h3>
                    <div className="py-4 flex  justify-center">
                      <FiMail className="w-6 mr-2 dark:text-dark-text-fill" />
                      {data?.email}
                    </div>
                    <div className="flex">
                      <PhoneIcon className="w-4 mr-4 dark:text-dark-text-fill" />
                      {data?.telephone ? data.telephone : "N/A"}
                    </div>
                  </div>
                  <div className="p-2 border md:col-span-3 bg-white  dark:bg-dark-bg shadow">
                    <h2 className="text-xl font-bold m-2  mb-4">Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                      <div className="py-4 flex justify-start md:col-span-2">
                        <UserIcon className="w-6 mr-2 dark:text-dark-text-fill" />
                        <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                          Role
                        </span>
                        :
                        <span className="ml-2 text-gray-800 dark:text-dark-text-fill">
                          {data.role !== "EMPLOYEE"
                            ? roles[roleName]
                            : data?.Employee?.job_title}
                        </span>
                      </div>
                      <div className="py-4 flex justify-start">
                        <AiOutlineUserSwitch className="mt-1 w-6 mr-2 dark:text-dark-text-fill" />
                        <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                          Gender
                        </span>
                        :
                        <span className="ml-2 text-gray-800 dark:text-dark-text-fill">
                          {data?.gender ?? "N/A"}
                        </span>
                      </div>
                      <div className="py-4 flex justify-start">
                        <AiFillBank className="mt-1 w-6 mr-2 dark:text-dark-text-fill" />
                        <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                          Bank
                        </span>
                        :
                        <span className="ml-2  text-gray-800 dark:text-dark-text-fill">
                          {data?.Employee?.bankName ?? "N/A"}
                        </span>
                      </div>
                      <div className="py-4 flex justify-start md:col-span-2">
                        <AiFillMoneyCollect className="mt-1 w-6 mr-2 dark:text-dark-text-fill" />
                        <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                          Salary
                        </span>
                        :
                        <span className="ml-2  text-gray-800 dark:text-dark-text-fill">
                          {data?.Employee?.salary
                            ? `${data?.Employee.salary} Rwf`
                            : "N/A"}
                        </span>
                      </div>
                      <div className="py-4 flex justify-start md:col-span-2">
                        <AiFillBuild className="mt-1 w-6 mr-2 dark:text-dark-text-fill" />
                        <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                          Department
                        </span>
                        :
                        <span className="ml-2  text-gray-800 dark:text-dark-text-fill">
                          {data?.department ?? "N/A"}
                        </span>
                      </div>
                      <div className="py-4 flex justify-start md:col-span-2">
                        <AiFillCalendar className="mt-1 w-6 mr-2 dark:text-dark-text-fill" />
                        <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                          Added
                        </span>
                        :
                        <span className="ml-2  text-gray-800 dark:text-dark-text-fill">
                          {formatDateInWords(data?.createdAt)}
                        </span>
                      </div>

                      <div className="py-4 flex justify-start md:col-span-2">
                        <HiUsers className="mt-1 w-6 mr-2 dark:text-dark-text-fill" />
                        <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                          Leave Requests
                        </span>
                        :
                        <span className="ml-2  text-gray-800 dark:text-dark-text-fill">
                          {data?.Employee?.leaveRequests?.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Organizations starts */}
                {loggedInUser?.role == "HR" && loggedInUser?.id !== data.id && (
                  <div className="grid grid-cols-1 md:grid-cols-2 m-1 p-2 -ml-2 -mr-2 relative">
                    <div className="border p-2 m-2 mt-9 flex flex-col justify-start items-start  bg-white  dark:bg-dark-bg shadow ">
                      <h3 className="text-xl font-bold m-2  mb-4">
                        {t("Employment History")}
                      </h3>
                      {data?.Employee?.employmentHistory?.map(
                        (history: any) => (
                          <>
                            {" "}
                            <div className="py-2 flex  justify-center">
                              <h4 className="font-bold text-base mr-4">
                                {t("Company")}:
                              </h4>
                              {history?.companyName}
                            </div>
                            <div className="py-2 flex  justify-center">
                              <h4 className="font-bold text-base mr-4">
                                {t("End Date")}:
                              </h4>
                              {formatDateInWords(history?.endDate)}
                            </div>
                            <div className="py-2 flex  justify-center">
                              <h4 className="font-bold text-base mr-4">
                                {t("Reason for Leaving")}:
                              </h4>
                              {history?.reasonForLeaving}
                            </div>
                          </>
                        )
                      )}
                    </div>
                    <div className="p-2 border m-2 mt-0 md:mt-9 flex flex-col justify-start items-start  bg-white  dark:bg-dark-bg shadow ">
                      <h3 className="text-xl font-bold m-2  mb-4">
                        {t("Qualifications")}
                      </h3>
                      {data?.Employee?.qualifications?.map(
                        (qualification: any) => (
                          <>
                            {" "}
                            <div className="py-2 flex  justify-center">
                              <h4 className="font-bold text-base mr-4">
                                {t("Degree")}:
                              </h4>
                              {qualification?.degree}
                            </div>
                            <div className="py-2 flex  justify-center">
                              <h4 className="font-bold text-base mr-4">
                                {t("Institution")}:
                              </h4>
                              {qualification?.institution}
                            </div>
                            <div className="py-2 flex  justify-center">
                              <h4 className="font-bold text-base mr-4">
                                {t("Year")}:
                              </h4>
                              {qualification?.completionYear}
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* About section end */}

              {/* Change password  start */}
              <div
                className={openTab === "Account" ? "block" : "hidden"}
                id="link2"
              >
                <EditPassword />
              </div>
              {/* Change password  end */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
