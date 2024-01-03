import { useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { educationFields } from "../../../constants/profile";
import { createApiData, fetchApiData } from "../../../redux/features";

const fieldState: fields = {};

educationFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const AddEducationModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      ...createFieldState,
    };

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/student/education",
        })
      ).unwrap();

      toast.success("New education details added successfully");
      onClose();
      setCreateFieldState(fieldState);

      dispatch(fetchApiData("/student/education"));
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add new education"
      styles="max-w-xl"
    >
      <form
        method="POST"
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        {educationFields.map((field) => (
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
      </form>
    </Modal>
  );
};

export default AddEducationModal;
