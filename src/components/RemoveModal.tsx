import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import Modal from "./Modal";

interface Props<T> {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (entity: T) => AsyncThunkAction<void, any, any>;
  onFetch?: AsyncThunkAction<any, string, any>;
  message?: string;
  entity: T;
  title: string;
}

const RemoveModal = <T extends {}>({
  isOpen,
  onClose,
  onDelete,
  entity,
  message,
  title,
  onFetch,
}: Props<T>) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(onDelete(entity)).unwrap();
      toast.success(`Action completed successfully`);
      onClose();
      if (onFetch) {
        await dispatch(onFetch).unwrap();
      }
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
      title={title}
      onSubmit={handleDelete}
    >
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {message ? message : `Are you sure you want to ${title}?`}
        </p>
      </div>
    </Modal>
  );
};

export default RemoveModal;
