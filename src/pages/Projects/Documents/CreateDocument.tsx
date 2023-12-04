import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import List from "../../../components/List";
import { createApiData, fetchApiData } from "../../../redux/features";
import { documentFields } from "../../../constants/project";
import Button from "../../../components/Button";
import { AiOutlineUpload } from "react-icons/ai";
import Combo from "../../../components/Combo";

const fieldState: fields = {};
documentFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const documentTypes = [
  "Report",
  "Proposals or Plan",
  "Contract or Agreement",
  "Presentation",
  "Research Data",
];

const RequestLeaveModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();

  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);
  const [category, setCategory] = useState("");
  const [project, setProject] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile?.type !== "application/pdf")
      return toast.error("Please select a pdf file");

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) return toast.error("Please select document category");
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("documents", file as File);
    formData.append("category", category);
    for (let key in createFieldState) {
      formData.append(key, createFieldState[key] as string);
    }


    try {
      await dispatch(
        createApiData({
          body: formData,
          url: `/projects/${project?.id}/documents`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).unwrap();

      toast.success("Document created  successfully");
      onClose();
      setCreateFieldState(fieldState);
      setCategory("");
      setProject("");
      setFile(null);
      dispatch(fetchApiData("/projects/documents"));
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

  useEffect(() => {
    dispatch(fetchApiData("/projects/documents"));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Create new document"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
          {documentFields.map((field) => (
            <Input
              key={field.id}
              type={field.type}
              placeholder={field.placeholder}
              labelFor={field.labelFor}
              labelText={field.labelText}
              handleChange={handleFormChange}
              isRequired={field.isRequired}
              id={field.id}
              defaultValue={fieldState[field.id as keyof typeof fieldState]}
              name={field.name}
              customClass=""
            />
          ))}
          <List
            selectedItem={category}
            items={documentTypes}
            onChange={setCategory}
            label="Document Category"
          />
          <div className=" ">
            {!loading && (
              <Combo
                styles="top-36 top"
                selected={project}
                options={data?.projects ?? []}
                setSelected={setProject}
                title="Project "
                valueKey="id"
                displayKey="project_name"
                isMultiple={false}
              />
            )}
          </div>
          <div>
            <label htmlFor="" className="font-semibold">
              File
            </label>

            <Button
              variant="primary"
              size="md"
              onClick={() => {}}
              style=" p-1 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
            >
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center"
              >
                <AiOutlineUpload className="mt-[2px] w-6 h-5" />
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
        </div>
      </form>
    </Modal>
  );
};


export default RequestLeaveModal;
