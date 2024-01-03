import { useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { IProps } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";

import Button from "../../../components/Button";
import { HiCloudArrowUp } from "react-icons/hi2";
import {
  fetchApiData,
  updateApiData,
} from "../../../redux/features";

export default function AddResumeModal({ isOpen, onClose }: IProps) {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await dispatch(
        updateApiData({
          body: formData,
          url: "/student/resume",
        })
      ).unwrap();

      toast.success("Resume uploaded successfully");
      onClose();

      dispatch(fetchApiData("/student/certificate"));
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Upload resume"
      styles="max-w-xl"
    >
      <form
        method="POST"
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        <div className="py-2">
          <label htmlFor="" className="font-semibold">
            Resume <span className="text-red-500">*</span>
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
              <HiCloudArrowUp className="mt-[2px] w-6 h-5" />
              <span className="ml-2">Upload Pdf File</span>
            </label>
          </Button>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
          {file && <p className="mt-2 text-sm">Selected file: {file.name}</p>}
        </div>
      </form>
    </Modal>
  );
}
