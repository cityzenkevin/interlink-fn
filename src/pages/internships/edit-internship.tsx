import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { fields } from "../../types";
import Input from "../../components/Input";
import List from "../../components/List";
import { createApiData, fetchApiData } from "../../redux/features";
import Button from "../../components/Button";
import { HiCloud, HiPlus } from "react-icons/hi2";
import { FaUpload } from "react-icons/fa";
import Edit from "../../sections/internships/Editor";
import PhotoModal from "../../components/PhotoModal";

export default function EditInternship() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.api);

  const navigate = useNavigate();

  const location = useLocation();
  const internship = location.state as any;
  console.log(internship);

  const [createFieldState, setCreateFieldState] = useState<fields>({
    description: internship?.description,
    deadline: internship?.deadline,
    title: internship?.title,
    internship_duration: internship?.duration,
  });
  const [duration, setDuration] = useState(internship?.durationUnit);
  const [department, setDepartment] = useState(internship?.department);
  const [file, setFile] = useState<File | null>(null);
  const [internshipPhoto, setInternshipPhoto] = useState<File | null>(null);
  const [photoOpen, setPhotoOpen] = useState(false);

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!duration) return toast.error("Please select a internship duration");
    if (!department) return toast.error("Please select a department");

    if (parseInt(createFieldState.internship_duration as string) < 1)
      return toast.error("Internship duration cannot be less than 1");

    if (
      duration == "Months" &&
      parseInt(createFieldState.internship_duration as string) > 12
    )
      return toast.error("Internship duration cannot be more than 12 months");
    if (
      duration == "Weeks" &&
      parseInt(createFieldState.internship_duration as string) > 52
    )
      return toast.error("Internship duration cannot be more than 52 weeks");
    const formData = new FormData();

    formData.append("title", createFieldState.title as string);
    formData.append("description", createFieldState.description as string);
    formData.append("unit", duration);
    formData.append("duration", createFieldState.internship_duration as string);
    formData.append("internshipFile", file as File);
    formData.append("internshipPhoto", internshipPhoto as File);
    formData.append("deadline", createFieldState.deadline as string);
    formData.append("department", department);
    formData.append("startDate", createFieldState["start-date"] as string);

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/users/internship",
        })
      ).unwrap();

      setTimeout(() => {
        toast.success("Internship added successfully");
      }, 1000);

      setCreateFieldState({
        description: "",
        deadline: "",
        title: "",
        internship_duration: "",
      });

      setFile(null);
      setInternshipPhoto(null);
      dispatch(fetchApiData("/student/internship"));
      navigate("/dashboard/internships");
    } catch (error: any) {
      if (error.message) {
        if (error.message === "Validation failed") {
          console.log(error);
          return toast.error(error?.data?.data[0]?.message);
        }
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile?.type !== "application/pdf")
      return toast.error("Please select a pdf file");
    if (uploadedFile.size > 10485760)
      return toast.error("File size must be less than 10mb");
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];

    if (
      uploadedFile?.type !== "image/png" &&
      uploadedFile?.type !== "image/jpeg"
    )
      return toast.error("Please select a png or jpeg file");

    if (uploadedFile.size > 10485760)
      return toast.error("File size must be less than 10mb");
    if (uploadedFile) {
      setInternshipPhoto(uploadedFile);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="mt-16 m-2 md:mr-40">
      <div className="lg:ml-52">
        <h3 className="font-medium text-lg mb-4">Edit Internship</h3>
      </div>
      <div className="bg-white border  shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              labelText="Internship Title"
              labelFor="title"
              id="title"
              name="title"
              type="text"
              isRequired={true}
              placeholder="Enter Internship Title"
              handleChange={handleFormChange}
              defaultValue={
                internship?.title ? internship?.title : createFieldState.title
              }
            />

            <div className=" md:mt-0 flex items-end col-span-2">
              <List
                selectedItem={duration}
                items={["Days", "Weeks", "Months"]}
                onChange={setDuration}
                label="Duration Unit"
              />
              <input
                id="internship_duration"
                type="number"
                name="internship_duration"
                className={`rounded-md shadow-md appearance-none  relative block w-full px-3 py-2 border
                 border-gray-300   placeholder-gray-500 text-gray-900 focus:outline-none   focus:ring-1
                  focus:ring-primary focus:border-primary focus:z-10 sm:text-sm  dark:text-dark-text-fill
                   dark:border-white ml-2`}
                placeholder={"Internship Duration"}
                onChange={handleFormChange}
                required={true}
                defaultValue={
                  internship?.duration
                    ? internship?.duration
                    : createFieldState.internship_duration
                }
              />
            </div>
            <Input
              labelText="Application Deadline"
              labelFor="deadline"
              id="deadline"
              name="deadline"
              type="date"
              isRequired={false}
              placeholder="Enter Internship Application Deadline"
              handleChange={handleFormChange}
              defaultValue={""}
            />
            <Input
              labelText="Start Date"
              labelFor="start-date"
              id="start-date"
              name="start-date"
              type="date"
              isRequired={false}
              placeholder="Enter Internship Start Date"
              handleChange={handleFormChange}
              defaultValue={internship?.startDate}
            />
            <div>
              <List
                selectedItem={department}
                items={[
                  "Business",
                  "IT",
                  "Law",
                  "Accounting",
                  "Marketing",
                  "HR",
                  "Finance",
                  "Engineering",
                  "Others",
                ]}
                onChange={setDepartment}
                label="Department"
              />
            </div>
            <div className=" md:col-span-3 flex flex-col">
              <label htmlFor="description" className="font-semibold mb-2">
                Description
              </label>

              <Edit
                value={createFieldState.description as string}
                setValue={(value) => {
                  setCreateFieldState({
                    ...createFieldState,
                    description: value,
                  });
                }}
                initialValue={internship?.description}
              />
            </div>
            <div className="py-2">
              <label htmlFor="" className="font-semibold">
                Internship Document
              </label>

              <Button
                variant="primary"
                size="md"
                onClick={() => {}}
                style=" p-1 mt-3 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
              >
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center"
                >
                  <FaUpload className="mt-[2px] w-6 h-5" />
                  <span className="ml-2">Upload Pdf File</span>
                </label>
              </Button>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              {file && (
                <p className="mt-2 text-sm">Selected file: {file.name}</p>
              )}
              <div>
                <Link
                  to={internship?.documentUrl}
                  target="_blank"
                  className="text-primary font-semibold mt-4"
                >
                  View current internship document
                </Link>
              </div>
            </div>
            <div className="py-2 ml-auto md:ml-24">
              <label htmlFor="" className="font-semibold">
                Internship Photo
              </label>

              <Button
                variant="primary"
                size="md"
                onClick={() => {}}
                style=" p-1 mt-3 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
              >
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex items-center"
                >
                  <HiCloud className="mt-[2px] w-6 h-5" />
                  <span className="ml-2">Upload Project Photo</span>
                </label>
              </Button>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={handleImageUpload}
              />
              {internshipPhoto && (
                <p className="mt-2 text-sm">
                  Selected file: {internshipPhoto.name}
                </p>
              )}
              <div>
                <label
                  htmlFor=""
                  className="
                text-primary font-semibold mt-4"
                >
                  Current project photo
                </label>
                <img
                  src={internship?.photoUrl}
                  className="border-4 border-gray-200 cursor-pointer rounded-lg w-1/3 shadow-md"
                  alt=""
                  onClick={() => setPhotoOpen(true)}
                />
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            type="submit"
            style={`
            ${
              loading
                ? "bg-gray-400 hover:bg-gray-300"
                : "bg-primary hover:bg-primaryHover  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            }
            inline-flex ml-auto justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium
             text-white `}
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                {" "}
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>{" "}
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v0a8 8 0 018 8v2a10 10 0 00-9-9"
                ></path>{" "}
              </svg>
            ) : (
              <HiPlus className="mt-[2px] w-6 h-5" />
            )}
            {loading ? "Loading" : "Add Internship"}
          </Button>
        </form>
      </div>
      <PhotoModal
        projectPhoto={internship?.photoUrl}
        isOpen={photoOpen}
        onClose={() => setPhotoOpen(false)}
      />
    </div>
  );
}
