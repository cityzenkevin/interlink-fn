import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Button from "../../components/Button";

import { IProps } from "../../types";
import { useAppDispatch } from "../../redux/hook";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSend,
} from "react-icons/ai";

import EmployeeProfile from "./EmployeeProfile";
import EmployeeExperience from "./EmployeeExperience";
import EmployeeQualification from "./EmployeeQualifications";
import { createApiData, fetchApiData } from "../../redux/features";

const fieldState = {
  firstname: "",
  lastname: "",
  email: "",
  telephone: "",
  salary: "",
  bankName: "",
  accountNumber: "",
  department: "",
  job_title: "",
  qualifications: {
    degree: "",
    institution: "",
    completionYear: "",
  },
  employmentHistory: {
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  },
};

const AddEmployeeModal = ({ isOpen, onClose }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState("");
  const [degree, setDegree] = useState("");

  const [formState, setFormState] = useState(fieldState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  const handleQualificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      qualifications: {
        ...formState.qualifications,
        [name]: value,
      },
    });
  };

  const handleExperienceChange = (event: any) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      employmentHistory: {
        ...formState.employmentHistory,
        [name]: value,
      },
    });
  };

  const totalPages = 3;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gender === "" || degree === "" || reasonForLeaving === "") {
      toast.error("Please select all fields");
      return;
    }
    const formData = {
      ...formState,
      gender,
      qualifications: [
        {
          ...formState.qualifications,
          degree,
        },
      ],
      employmentHistory: [
        {
          ...formState.employmentHistory,
          reasonForLeaving,
        },
      ],
    };

    try {
      await dispatch(
        createApiData({ body: formData, url: "/employees" })
      ).unwrap();
      toast.success("Employee created successfully");
      onClose();
      setFormState(fieldState);
      setGender("");
      setDegree("");
      setReasonForLeaving("");
      dispatch(fetchApiData("/employees"));
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-screen items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-ful m-2 md:min-h-[80vh] max-w-md md:max-w-[72vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  {t("Add New Employee")}
                  <hr className="mt-2" />
                </Dialog.Title>
                <form
                  method="POST"
                  className=" flex flex-col min-h-[65vh]"
                  onSubmit={handleSubmit}
                >
                  <div className="m-4  mt-2">
                    {currentPage === 1 && (
                      <EmployeeProfile
                        fieldState={formState}
                        handleFormChange={handleInputChange}
                        gender={gender}
                        setGender={setGender}
                      />
                    )}
                    {currentPage === 2 && (
                      <EmployeeExperience
                        fieldState={formState}
                        handleFormChange={handleExperienceChange}
                        reasonForLeaving={reasonForLeaving}
                        setReasonForLeaving={setReasonForLeaving}
                      />
                    )}
                    {currentPage === 3 && (
                      <EmployeeQualification
                        fieldState={formState}
                        handleFormChange={handleQualificationChange}
                        degree={degree}
                        setDegree={setDegree}
                      />
                    )}
                  </div>
                  <div className="flex mt-auto">
                    <button
                      type="button"
                      className={`flex border border-primary bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        currentPage === 1 ? "hidden" : "block"
                      }`}
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <AiOutlineArrowLeft className="mt-[2px] w-6 h-5" />
                      {t("Prev")}
                    </button>
                    {currentPage !== totalPages ? (
                      <Button
                        variant="primary"
                        size="md"
                        type="button"
                        onClick={handleNextPage}
                        style={`p-2 ml-auto flex rounded-sm ${"text-white bg-primary hover:bg-white hover:border-primary hover:text-primary"} border border shadow-sm`}
                      >
                        <AiOutlineArrowRight className="mt-[2px] w-6 h-5" />
                        {t("Next")}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        style={`p-2 ml-auto flex rounded-sm ${"border-gray-500 hover:bg-white hover:border-primary hover:text-primary"} border border shadow-sm`}
                      >
                        <AiOutlineSend className="mt-[2px] w-6 h-5" />

                        {t("Submit")}
                      </Button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddEmployeeModal;
