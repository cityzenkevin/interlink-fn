import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import List from "../../components/List";
import { userFields } from "../../constants/formFields";
import Input from "../../components/Input";
import usersApi from "../../services/users.api";
import { createApiData, fetchApiData } from "../../redux/features";

const Roles = ["Human Resource", "Finance Manager", "Project Manager"];

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const AddSupervisorModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState("");
  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gender === "") {
      toast.error("Please select gender");
      return;
    }

    try {
      await dispatch(
        createApiData({
          url: "/users",
          body: {
            ...createFieldState,
            gender,
            role: 'SUPERVISOR'
          },
        })
      ).unwrap();
      toast.success("Supervisor added successfully");
      onClose();
      setCreateFieldState(fieldState);
      setGender("");
      dispatch(fetchApiData("/users/supervisors"));
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
      title="Add New Supervisor"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
          <div className="grid grid-cols-1 gap-2">
            <List
              items={["Male", "Female"]}
              selectedItem={gender}
              onChange={setGender}
              label="Gender"
            />
          </div>
          {userFields.map((field) => (
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
        </div>
      </form>
    </Modal>
  );
};

export default AddSupervisorModal;
