import { useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { certificateFields } from "../../../constants/profile";
import Edit from "../../internships/Editor";
import Button from "../../../components/Button";
import { HiCloudArrowUp } from "react-icons/hi2";
import { createApiData, fetchApiData } from "../../../redux/features";

const fieldState: fields = {};

certificateFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function AddExperienceModal({ isOpen, onClose }: IProps) {
  const dispatch = useAppDispatch();
  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("certificate", file);
    formData.append("description", description);

    for (const key in createFieldState) {
      formData.append(
        key,
        createFieldState[key as keyof typeof createFieldState] as string
      );
    }

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/student/certificate",
        })
      ).unwrap();

      toast.success("New certificate  added successfully");
      onClose();

      setCreateFieldState(fieldState);

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
      title="Add new experience"
      styles="max-w-xl"
    >
      <form
        method="POST"
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        {certificateFields.map((field) => (
          <Input
            key={field.id}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            handleChange={handleChange}
            defaultValue={fieldState[field.id]}
          />
        ))}
        <div className="py-2">
          <label htmlFor="" className="font-semibold">
            Certificate File <span className="text-red-500">*</span>
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
        <div className="flex flex-col col-span-2 gap-2">
          <label htmlFor="description" className="font-semibold mb-2">
            Description (optional)
          </label>
          <Edit
            setValue={(value) => setDescription(value)}
            value={description}
            height={200}
            initialValue="
        <p>
            Write description here
        </p>
        "
          />
        </div>
      </form>
    </Modal>
  );
}
