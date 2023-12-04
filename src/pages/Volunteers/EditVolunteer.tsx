import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { userFields } from "../../constants/formFields";
import Input from "../../components/Input";
import {
  createApiData,
  fetchApiData,
  updateApiData,
} from "../../redux/features";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

interface EProps extends IProps {
  volunteer: any;
}

const EditVolunteerModal = ({ isOpen, onClose, volunteer }: EProps) => {
  const dispatch = useAppDispatch();

  const [createFieldState, setCreateFieldState] = useState<fields>(volunteer);

  useEffect(() => {
    setCreateFieldState(volunteer);
  }, [volunteer]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        updateApiData({
          body: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            telephone: formData.telephone,
          },
          url: `/volunteers/${volunteer.id}`,
        })
      ).unwrap();

      toast.success("Volunteer edited successfully");
      onClose();
      setCreateFieldState(fieldState);
      dispatch(fetchApiData("/volunteers"));
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
    dispatch(fetchApiData("/skills"));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit  Volunteer"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
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
              defaultValue={
                createFieldState[field.id as keyof typeof fieldState]
              }
              name={field.name}
              customClass=""
            />
          ))}
        </div>
      </form>
    </Modal>
  );
};

export default EditVolunteerModal;
