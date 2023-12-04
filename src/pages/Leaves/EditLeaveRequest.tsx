import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { leaveFields } from "../../constants/employee";

interface IEditProps extends IProps {
  student: fields;
}

const fieldState: fields = {};
leaveFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const EditLeaveRequestModal = ({ isOpen, onClose, student }: IEditProps) => {
  const [selectedStudent, setSelectedStudent] = useState<fields>(student);
  const dispatch = useAppDispatch();

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //   await dispatch(updateStudent(selectedStudent)).unwrap();
      toast.success("Student updated successfully");
      onClose();
      setSelectedStudent(fieldState);
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
      title="Edit Student"
      styles="max-w-xl"
    >
      <div className="mt-2">
        <hr className="mt-2" />
        <div className="mt-2 m-2">
          <form method="POST" onSubmit={handleEditSubmit}>
            {leaveFields.map(
              (field) =>
                field.name !== "studentId" && (
                  <Input
                    key={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    labelFor={field.labelFor}
                    labelText={field.labelText}
                    handleChange={(e) => {
                      setSelectedStudent({
                        ...selectedStudent,
                        [field.id]: e.target.value,
                      });
                    }}
                    isRequired={field.isRequired}
                    id={field.id}
                    defaultValue={
                      selectedStudent[field.id as keyof typeof fieldState]
                    }
                    name={field.name}
                  />
                )
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditLeaveRequestModal;
