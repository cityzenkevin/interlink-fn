import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import { IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import List from "../../components/List";
import { createApiData, fetchApiData } from "../../redux/features";
import { leaveFields } from "../../constants/employee";

const fieldState: fields = {};
leaveFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const LeaveTypes = [
  "Annual Leave",
  "Sick Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Family Care Leave",
  "Unpaid Leave",
  "Study Leave",
  "Public Holidays",
  "Compassionate Leave",
  "Special Projects Leave",
  "Volunteer Leave",
  "Emergency Leave",
  "Travel Leave",
  "Other",
];

const RequestLeaveModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);
  const [leave_type, setLeaveType] = useState("");

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leave_type) return toast.error("Please select a leave type");

    const formData = {
      ...createFieldState,
      leave_type,
    };

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/employees/leaveRequests",
        })
      ).unwrap();

      toast.success("Leave Request made successfully");
      onClose();
      setCreateFieldState(fieldState);
      setLeaveType("");
      dispatch(fetchApiData("/employees/leaveRequests"));
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
    dispatch(fetchApiData("/employees/leaveRequests"));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="New Leave Request"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
          <div className="col-span-2">
            <List
              selectedItem={leave_type}
              items={LeaveTypes}
              onChange={setLeaveType}
              label="Leave Type"
            />
          </div>
          {leaveFields.map((field) => (
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
          <div className="col-span-2 flex flex-col">
            <label htmlFor="Responsabilities" className="font-semibold mb-2">
              {t("Reason")}
            </label>
            <textarea
              className="border shadow-sm rounded-md p-2 border-gray-300  focus:ring-1 focus:ring-primary focus:border-primary focus:z-10"
              name="reason"
              id="reason"
              cols={20}
              rows={3}
              onChange={handleFormChange}
            ></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default RequestLeaveModal;
