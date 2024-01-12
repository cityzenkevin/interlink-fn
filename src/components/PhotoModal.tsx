import { useEffect, useState } from "react";
import { IProps } from "../types";
import Modal from "./Modal";

interface Props extends IProps {
  projectPhoto: any;
}
export default function PhotoModal({ projectPhoto, isOpen, onClose }: Props) {
  const [photo, setPhoto] = useState<any>(null);

  useEffect(() => {
    setPhoto(projectPhoto);
  }, [projectPhoto]);
  console.log(photo);
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title="View Photo"
        styles="max-w-xl"
      >
        <div className="flex flex-col">
          <img
            className="border-4 border-gray-200 rounded-lg w-full h-1/2 shadow-md"
            src={photo}
            alt=""
          />
        </div>
      </Modal>
    </>
  );
}
