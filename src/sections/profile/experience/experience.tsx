import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ExperienceItem } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {  AiFillPlusSquare } from "react-icons/ai";
import AddExperienceModal from "./add-experience";
import { fetchApiData } from "../../../redux/features";
import ExperienceCard from "./experience-card";


export default function Experience() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/student/experience"));
  }, [dispatch]);

  const [addModal, setAddModal] = useState(false);

  const { t } = useTranslation();

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

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
                {t("Experience")}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="  border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[75%] h-fit  rounded-lg">
        <div className="px-4 py-4">
          {data?.experience?.length > 0 ? (
            data?.experience?.map((item: ExperienceItem, idx: number) => (
              <ExperienceCard key={idx + 'experience'} item={item} idx={idx} />
            ))
          ) : (
            <div>
              <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
                No experience details
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
      </div>
      <AddExperienceModal isOpen={addModal} onClose={handleAddModal} />
    </div>
  );
}
