import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hook";
import { IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { userFields } from "../../constants/formFields";
import Input from "../../components/Input";
import { updateApiData } from "../../redux/features";

interface IEditProps extends IProps {
  user: fields;
}

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const EditUserModal = ({ isOpen, onClose, user }: IEditProps) => {
  const [selectedUser, setSelectedUser] = useState<fields>({
    ...user,
    firstname: user.firstName,
    lastname: user.lastName,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedUser({
      ...user,
      firstname: user.firstName,
      lastname: user.lastName,
    });
  }, [user]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateApiData({
          body: {
            firstName: selectedUser.firstname,
            lastName: selectedUser.lastname,
            email: selectedUser.email,
            telephone: selectedUser.telephone,
          },
          url: `/users/${user.id}`,
        })
      ).unwrap();
      toast.success("User updated successfully");
      onClose();
      setSelectedUser(fieldState);
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
  console.log(selectedUser);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditSubmit}
      title="Edit User"
      styles="max-w-xl"
    >
      <div className="mt-2">
        <hr className="mt-2" />
        <div className="mt-2 m-2">
          <form method="POST" onSubmit={handleEditSubmit}>
            {userFields.map((field) => (
              <Input
                key={field.id}
                type={field.type}
                placeholder={field.placeholder}
                labelFor={field.labelFor}
                labelText={field.labelText}
                handleChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    [field.id]: e.target.value,
                  });
                }}
                isRequired={field.isRequired}
                id={field.id}
                defaultValue={selectedUser[field.id as keyof typeof fieldState]}
                name={field.name}
              />
            ))}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
