import { useTranslation } from "react-i18next";

import { AiFillPlusSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import AddEducationModal from "./add-education";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { fetchApiData } from "../../../redux/features";
import { EducationItem } from "../../../types";
import EducationCard from "./education-card";

export default function Education() {
  const dispatch = useAppDispatch();
  const [addModal, setAddModal] = useState(false);

  const data = useAppSelector((state) => state.api);

  const { t } = useTranslation();

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  useEffect(() => {
    dispatch(fetchApiData("/student/education"));
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
                {t("Education")}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="  border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[75%] h-fit  rounded-lg">
        <div className="px-4 py-4">
          {data?.education?.length > 0 ? (
            data?.education?.map((item: EducationItem, idx: number) => (
              <EducationCard key={idx + 'education'} item={item} idx={idx} />
            ))
          ) : (
            <div>
              <div className="text-center py-4 px-8 bg-red-600 rounded-full text-white font-semibold">
                No education details
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
      <AddEducationModal isOpen={addModal} onClose={handleAddModal} />
    </div>
  );
}
