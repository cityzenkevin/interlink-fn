import { Link, useNavigate } from "react-router-dom";

import { Internship } from "../../types";
import { AiFillEye, AiOutlineArrowRight } from "react-icons/ai";
import { useAppDispatch } from "../../redux/hook";
import { setLastPage } from "../../redux/features/auth.feature";
import { useState } from "react";
import ApplicationCommentModal from "../internships/ApplicationCommentModal";
import { toast } from "react-toastify";
import { createApiData } from "../../redux/features";

export default function InternshipCard({
  title,
  id,
  deadline,
  photoUrl,
  created,
  department,
}: Internship) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth") || "{}");

  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        createApiData({
          body: {
            comment,
          },
          url: `/internships/${id}/apply`,
        })
      ).unwrap();
      toast.success("Application submitted successfully");
      setCommentModal(false);
      setComment("");
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

  const handleCommentModal = () => {
    setCommentModal(false);
  };

  const handleApply = (e: any) => {
    if (!user?.id) {
      console.log(">>>> ");
      dispatch(setLastPage(e.target.value));
      navigate("/login");
      return;
    }
    setCommentModal(true);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded border border-gray-300">
        <div className="w-full h-48 overflow-hidden bg-gray-300">
          <img
            src={photoUrl}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm">
            <span className="text-primary font-semibold">{department}</span>
            <span className="ml-4 text-gray-600">
              {new Date(created)?.toDateString()}
            </span>
          </div>
          <Link to={`/internships/${id}`}>
            <p className="text-lg font-semibold leading-tight mt-4">{title}</p>
          </Link>
          <div className="flex flex-col md:flex-row md:justify-between">
            {user?.role !== "ADMIN" && (
              <button
                value={`/internships/${id}`}
                onClick={handleApply}
                className="px-4 py-2 border flex bg-primary text-white  mt-2 hover:bg-white hover:text-primary hover:border-primary duration-100 transition-all ease-in-out"
              >
                <AiOutlineArrowRight className="w-6 mt-1" />
                Apply
              </button>
            )}
            <Link to={`/internships/${id}`}>
              <button className="px-4 py-2 flex border border-primary bg-white text-primary  mt-2 hover:bg-primary hover:text-white hover:border-primary duration-200 transition-all ease-in-out">
                <AiFillEye className="w-6 mt-1" />
                <span> View Details </span>
              </button>
            </Link>
          </div>
          <div className="flex items-center mt-4">
            <div className="ml-4">
              <p className="text-red-600">
                Deadline:
                <span className="text-gray-900 font-semibold ml-2">
                  {new Date(deadline)?.toDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ApplicationCommentModal
        onClose={handleCommentModal}
        comment={comment}
        isOpen={commentModal}
        handleComment={(value: string) => setComment(value)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
