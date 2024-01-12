import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IProps } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { createApiData, fetchApiData } from "../../redux/features";
import Combo from "../../components/Combo";
import Editor from "../internships/Editor";
import Input from "../../components/Input";

const NewEvaluationModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();

  const [student, setStudent] = useState<any>("");
  const [internship, setInternship] = useState<any>("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("");

  const data = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/student"));
    dispatch(fetchApiData("/student/applications"));
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (student === "" || internship === "" || description === "") {
      toast.error("Please select all fields");
      return;
    }

    if (parseInt(score) < 0 || parseInt(score) > 100) {
      toast.error("Score must be between 0 and 100");
      return;
    }
    try {
      await dispatch(
        createApiData({
          body: {
            description,
            studentId: student?.id,
            applicationId: internship?.id,
            score,
          },
          url: "/student/evaluation",
        })
      ).unwrap();

      toast.success("Evaluation made successfully");
      onClose();
      setStudent("");
      setScore("");
      setInternship("");
      setDescription("");
      dispatch(fetchApiData("/student/evaluation"));
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
      title="Make new evaluation"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid gap-2 grid-cols-2">
          <div className="grid grid-cols-1  gap-2">
            <Combo
              options={data?.student ?? []}
              selected={student}
              setSelected={setStudent}
              title="Student"
              valueKey={"id"}
              displayKey={"user?.username"}
              styles=" z-50"
            />
          </div>
          <div className="grid -mt-20 mb-36 grid-cols-1 gap-2">
            <Combo
              options={
                student?.applications?.filter(
                  (a: any) => a?.state === "APPROVED"
                ) ?? []
              }
              selected={internship}
              setSelected={setInternship}
              title="Internship"
              valueKey={"id"}
              displayKey={"internship?.title"}
              styles=""
            />
          </div>
          <div className="grid  grid-cols-1 col-span-2 gap-2">
            <Input
              type="number"
              name="score"
              id="score"
              placeholder="Enter score"
              isRequired={true}
              labelText="Score"
              labelFor="score"
              defaultValue={""}
              handleChange={(e) => setScore(e.target.value)}
              customClass=""
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="
            text-gray-700 font-semibold 
            "
            >
              Description <span className="text-red-500">*</span>
            </label>
            <Editor
              value={description}
              setValue={(value) => setDescription(value)}
              initialValue="Write the evaluation here"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewEvaluationModal;
