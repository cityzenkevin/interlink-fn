import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Certificate } from "../../../types";
import {
  AiFillEdit,
  AiFillPlusCircle,
  AiFillPlusSquare,
  AiOutlineLink,
} from "react-icons/ai";
import AddExperienceModal from "./add-certificate";
import { fetchApiData } from "../../../redux/features";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import CertificationCard from "./certification-card";
import AddResumeModal from "./change-resume";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Experience() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);

  const [addModal, setAddModal] = useState(false);
  const [resumeModal, setResumeModal] = useState(false);

  const { t } = useTranslation();

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  const handleResumeModal = () => {
    setResumeModal(!resumeModal);
  };

  useEffect(() => {
    dispatch(fetchApiData("/student/certificate"));
    dispatch(fetchApiData("/student/resume"));
  }, [dispatch]);

  return (
    <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen">
      <div className="flex flex-wrap ">
        <div className="">
          <ul
            className="flex mb-0 list-none flex-wrap pb-4 flex-row text-black dark:text-dark-text-fill"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <span className="uppercase font-extrabold text-primary text-lg rounded block leading-normal  ">
                {t("Achievements")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="  border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[75%] h-fit  rounded-lg">
        <div className="font-bold px-4 py-2 text-base mt-4">Certificates</div>

        <div className="px-4 py-4">
          {data?.certificate?.length > 0 ? (
            data?.certificate?.map((item: Certificate, idx: number) => (
              <CertificationCard
                key={idx + "achievement"}
                item={item}
                idx={idx}
              />
            ))
          ) : (
            <div>
              <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
                No uploaded certificates
              </div>
            </div>
          )}
          <button
            onClick={handleAddModal}
            className="bg-primary flex text-white px-3 mt-8 py-1  font-semibold my-2 hover:bg-white hover:text-primary hover:border-primary border-2 border-primary "
          >
            <AiFillPlusSquare className="w-6 mt-1" />
            <span>Add New</span>
          </button>
        </div>
        <div className="font-bold px-4 py-2 text-base mt-4">Resume</div>
        <div className="font-semibold flex justify-between items-center px-4 py-2 text-base mt-2 pb-6">
          {!data?.resume[0]?.resumeUrl ? (
            <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
              No uploaded resume
            </div>
          ) : (
            <a
              href={data?.resume[0]?.resumeUrl}
              target="_black"
              className="flex text-primary"
            >
              <span>{data?.resume[0]?.resumeName}</span>
              <FaExternalLinkAlt className="ml-2 mt-1" />
            </a>
          )}

          <div className="flex h-full items-center justify-center bg-grey-lighter  z-0 ">
            <button
              onClick={() => setResumeModal(true)}
              className="px-4 py-2 flex bg-white border border-primary text-primary hover:bg-primary hover:text-white"
            >
              {data?.resume ? (
                <AiFillEdit className="mt-1 w-5" />
              ) : (
                <AiFillPlusCircle className="mt-1 w-5" />
              )}
              {data?.resume !== null ? t("Change") : t("Add Resume")}
            </button>
          </div>
        </div>
      </div>
      <AddExperienceModal isOpen={addModal} onClose={handleAddModal} />
      <AddResumeModal isOpen={resumeModal} onClose={handleResumeModal} />
    </div>
  );
}
