import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hook";
import { IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import usersApi from "../../api/users.api";
import { donorFields } from "../../constants/finance";
import { fetchApiData, updateApiData } from "../../redux/features";

interface IEditProps extends IProps {
  donor: any;
}

const fieldState: fields = {};

donorFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const EditDonorModal = ({ isOpen, onClose, donor }: IEditProps) => {
  const [selectedDonor, setSelectedDonor] = useState(donor);
  const dispatch = useAppDispatch();
  console.log(selectedDonor);
  useEffect(() => {
    setSelectedDonor(donor);
  }, [donor]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      delete selectedDonor.id;
      if (selectedDonor.organization === null)
        delete selectedDonor.organization;

      await dispatch(
        updateApiData({ body: selectedDonor, url: `/users/donor/${donor.id}` })
      ).unwrap();
      toast.success("Donor updated successfully");
      onClose();
      setSelectedDonor(fieldState);
      dispatch(fetchApiData("/users/donor"))
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
      onSubmit={handleEditSubmit}
      title="Edit Donor"
      styles="max-w-xl"
    >
      <div className="mt-2">
        <hr className="mt-2" />
        <div className="mt-2 m-2">
          <form method="POST" onSubmit={handleEditSubmit}>
            {donorFields.map((field) => (
              <Input
                key={field.id}
                type={field.type}
                placeholder={field.placeholder}
                labelFor={field.labelFor}
                labelText={field.labelText}
                handleChange={(e) => {
                  setSelectedDonor({
                    ...selectedDonor,
                    [field.id]: e.target.value,
                  });
                }}
                isRequired={field.isRequired}
                id={field.id}
                defaultValue={
                  selectedDonor[field.id as keyof typeof fieldState]
                }
                name={field.name}
              />
            ))}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditDonorModal;
