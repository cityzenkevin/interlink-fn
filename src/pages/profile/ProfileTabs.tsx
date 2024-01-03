import { useState } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "../../assets/avatar.png";

import { passwordFields } from "../../constants/formFields";
import { fields } from "../../types";
import { EditPassword } from "../../sections/profile/edit-password";
import Experience from "../../sections/profile/experience/experience";
import { HiOutlinePencil } from "react-icons/hi2";
import EditProfile from "../../sections/profile/profile-edit";
import Education from "../../sections/profile/education/education";
import Achievements from "../../sections/profile/achievements/achievements";

const fieldState: fields = {};
passwordFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function ProfileTabs({ data }: any) {
  const [openTab, setOpenTab] = useState("Personal Details");
  const { t } = useTranslation();

  const user = data;
  let tabs;
  if (user?.role == "ADMIN") {
    tabs = ["Personal Details", "Account"];
  } else {
    tabs = [
      "Personal Details",
      "Education",
      "Experience",
      "Achievements",
      "Account",
    ];
  }

  return (
    <div className="flex lg:ml-48 mt-10">
      <>
        <div className="min-w-[22vw] bg-white px-2 py-4 rounded-lg border shadow-sm ">
          <div className="flex flex-col justify-center items-center pb-4">
            <img
              src={Avatar}
              className="w-20 md:w-28 h-20 md:h-28  rounded-full relative "
              alt="profile-avatar"
            />
            <div className="flex h-full items-center justify-center bg-grey-lighter  z-0 -mt-10 ml-20">
              <div role="button">
                <label className="flex flex-row text-center ml-auto mr-4 rounded-lg bg-primary text-white hover:bg-[#1eaad6] focus:outline-none p-1">
                  <HiOutlinePencil className="w-5 md:w-3 mr-1 mt-1 " />
                  <span className="text-lg md:text-sm ">
                    <span className="hidden md:block">{t("Edit")} </span>
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="font-semibold text-base">Rukundo</div>
            <div className="font-semibold text-gray-600 text-base">Email</div>
          </div>
          {/* Profile tabs option start */}
          <ul
            className="flex justify-start items-start  border py-3 font-semibold bg-gray-100 mb-0 list-none flex-wrap  flex-col rounded-md"
            role="tablist"
          >
            {tabs.map((tab) => (
              <li
                key={tab}
                className="-mb-px last:mr-0 flex-auto text-center
                 px-1 py-2 text-xs font-bold min-w-[20vw]
                "
              >
                <a
                  className={` font-bold rounded-full border-2 border-gray-100 text-sm px-3 md:px-5 py-3  block leading-normal ${
                    openTab === `${tab}`
                      ? "bg-white text-primary border-primary  "
                      : ""
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
        <div className="relative flex  min-w-0 break-words text-light-text dark:text-dark-text-fill  w-full rounded">
          <div className="py-2 flex-auto">
            <div className="tab-content tab-space ml-6">
              <div
                className={openTab === "Personal Details" ? "block" : "hidden"}
              >
                {/* About section start */}
                <EditProfile data={data} />
                {/* About section end */}
              </div>

              <div className={openTab === "Education" ? "block" : "hidden"}>
                <Education />
              </div>
              <div className={openTab === "Experience" ? "block" : "hidden"}>
                <Experience />
              </div>
              <div className={openTab === "Achievements" ? "block" : "hidden"}>
                <Achievements />
              </div>
              {/* Change password  start */}
              <div
                className={openTab === "Account" ? "block" : "hidden"}
                id="link2"
              >
                <EditPassword user={data} />
              </div>
              {/* Change password  end */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
