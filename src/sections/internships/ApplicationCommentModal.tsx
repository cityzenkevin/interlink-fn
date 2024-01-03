import { IProps } from "../../types";

import Modal from "../../components/Modal";
import Edit from "./Editor";

interface Props extends IProps {
  handleComment: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  comment: string;
}

const ApplicationCommentModal = ({
  isOpen,
  onClose,
  handleComment,
  comment,
  handleSubmit,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Apply for internship"
      styles="max-w-xl"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-semibold mb-2">
          Add comment (optional)
        </label>
        <Edit
          setValue={handleComment}
          value={comment}
          initialValue="
        <p>
            Write your comment here
        </p>
        "
        />
      </div>
    </Modal>
  );
};

export default ApplicationCommentModal;
