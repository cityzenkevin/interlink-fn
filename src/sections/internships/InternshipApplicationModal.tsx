import {
  Certificate,
  EducationItem,
  ExperienceItem,
  IProps,
  Internship,
  fields,
} from "../../types";

import Modal from "../../components/Modal";
import { userFields } from "../../constants/formFields";
import Avatar from "../../assets/avatar.png";
import { useState } from "react";
import EducationCard from "../profile/education/education-card";
import ExperienceCard from "../profile/experience/experience-card";
import { FaExternalLinkAlt } from "react-icons/fa";
import CertificationCard from "../profile/achievements/certification-card";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

interface Props extends IProps {
  internship: Internship;
}

export default function InternshipApplicationModal({
  isOpen,
  onClose,
  internship,
}: Props) {
  const tabs = ["Personal Details", "Education", "Experience", "Achievements"];
  const [openTab, setOpenTab] = useState("Personal Details");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={internship?.title}
      styles="max-w-3xl"
    >
      <div className="grid grid-cols-1 max-w  md:grid-cols-2 gap-2 max-w-">
        {/* Profile tabs option start */}
        <ul
          className="flex justify-start items-start   py-2 font-semibold mb-0 list-none rounded-md"
          role="tablist"
        >
          {tabs.map((tab) => (
            <li
              key={tab}
              className="-mb-px last:mr-0 flex-auto text-center
                 px-1 py-2 text-xs font-bold min-w-[12vw]
                "
            >
              <a
                className={` font-bold rounded-full border-2 border-gray-100 text-sm px-1 py-3  block leading-normal ${
                  openTab === `${tab}`
                    ? "bg-primary text-white border-primary  "
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
                {tab}
              </a>
            </li>
          ))}
        </ul>
        {/* Profile tabs option end */}
      </div>
      <div className="relative flex mb-28  min-w-0 break-words text-light-text w-full rounded">
        <div className="py-2 flex-auto">
          <div className="tab-content tab-space ml-6">
            {/* STUDENT INFO SECTION */}
            <div
              className={openTab === "Personal Details" ? "block" : "hidden"}
            >
              <div className="flex flex-col justify-center items-center pb-4">
                <img
                  src={Avatar}
                  className="w-20 md:w-28 h-20 md:h-28  rounded-full relative "
                  alt="profile-avatar"
                />
                <p className=" text-xl font-semibold">
                  {internship.student?.user?.firstName}{" "}
                  {internship.student?.user?.lastName}
                </p>
                <p className="text-lg mt-2 text-gray-500 ">
                  {internship.student?.user?.email}
                </p>
                <p className="text-lg mt-2 text-gray-500 ">
                  {internship.student?.user?.telephone}
                </p>
              </div>
            </div>
            {/* STUDENT INFO SECTION END*/}

            {/* EDUCATION START */}
            <div className={openTab === "Education" ? "block" : "hidden"}>
              <div className="  border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[75%] h-fit  rounded-lg">
                <div className="px-4 py-4">
                  {internship?.student?.education?.length > 0 ? (
                    internship?.student?.education?.map(
                      (item: EducationItem, idx: number) => (
                        <EducationCard
                          key={idx + "education"}
                          item={item}
                          idx={idx}
                        />
                      )
                    )
                  ) : (
                    <div>
                      <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
                        No education details
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* EDUCATION END */}
            {/* EXPERIENCE START */}
            <div className={openTab === "Experience" ? "block" : "hidden"}>
              <div className="  border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[75%] h-fit  rounded-lg">
                <div className="px-4 py-4">
                  {internship?.student?.experience?.length > 0 ? (
                    internship?.student?.experience?.map(
                      (item: ExperienceItem, idx: number) => (
                        <ExperienceCard
                          key={idx + "experience"}
                          item={item}
                          idx={idx}
                        />
                      )
                    )
                  ) : (
                    <div>
                      <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
                        No experience details
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* EXPERIENCE START */}

            <div className={openTab === "Achievements" ? "block" : "hidden"}>
              <div className="  border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[75%] h-fit  rounded-lg">
                <div className="font-bold px-4 py-2 text-base mt-4">
                  Certificates
                </div>

                <div className="px-4 py-4">
                  {internship?.student?.certificates?.length > 0 ? (
                    internship?.student?.certificates?.map(
                      (item: Certificate, idx: number) => (
                        <CertificationCard
                          key={idx + "achievement"}
                          item={item}
                          idx={idx}
                        />
                      )
                    )
                  ) : (
                    <div>
                      <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
                        No uploaded certificates
                      </div>
                    </div>
                  )}
                </div>
                <div className="font-bold px-4 py-2 text-base mt-4">Resume</div>
                <div className="font-semibold flex justify-between items-center px-4 py-2 text-base mt-2 pb-6">
                  {!internship?.student?.resumeUrl ? (
                    <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
                      No uploaded resume
                    </div>
                  ) : (
                    <a
                      href={internship?.student?.resumeUrl}
                      target="_black"
                      className="flex text-primary"
                    >
                      <span>{internship?.student?.resumeName}</span>
                      <FaExternalLinkAlt className="ml-2 mt-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
