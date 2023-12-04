import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/hook";

import { IProps } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { fetchApiData, updateApiData } from "../../redux/features";

const RejectLeave = ({
  isOpen,
  onClose,
  leave,
}: IProps & {
  leave: any;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [createFieldState, setCreateFieldState] = useState("");

  const handleFormChange = (e: any) => {
    setCreateFieldState(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = {
      rejection_reason: createFieldState,
      status: "Rejected",
    };

    try {
      await dispatch(
        updateApiData({
          body: formData,
          url: `/employees/leaveRequests/${leave}/reject`,
        })
      ).unwrap();

      toast.success("Leave request rejected successfully");
      onClose();
      setCreateFieldState("");
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Reject Leave Request"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className=" md:col-span-2 flex flex-col">
          <label htmlFor="description" className="font-semibold mb-2">
            {t("Reason for Rejection")}
          </label>
          <textarea
            className="border shadow-sm rounded-md p-2 border-gray-300  focus:ring-1 focus:ring-primary focus:border-primary focus:z-10"
            name="rejection_reason"
            id="rejection_reason"
            cols={20}
            rows={3}
            onChange={handleFormChange}
          ></textarea>
        </div>
      </form>
    </Modal>
  );
};

export default RejectLeave;
