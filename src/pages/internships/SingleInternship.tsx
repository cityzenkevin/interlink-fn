import { useEffect, useState } from "react";
import NavBar from "../../sections/landing-page/nav-bar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createApiData, fetchApiData } from "../../redux/features";
import { Internship } from "../../types";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import { setLastPage } from "../../redux/features/auth.feature";
import ApplicationCommentModal from "../../sections/internships/ApplicationCommentModal";

export default function SingleInternship() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);
  // const { loading } = useAppSelector((state) => state.api);
  const id = window.location.pathname.split("/")[2];

  const internship: Internship = data?.latestinternships;

  useEffect(() => {
    dispatch(fetchApiData("/internships"));
    dispatch(fetchApiData(`/internships/${id}`));
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const navigate = useNavigate();
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
          url: `/student/internship/${id}/apply`,
        })
      ).unwrap();

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
      dispatch(setLastPage(e.target.value));
      navigate("/login");
      return;
    }
    setCommentModal(true);
  };

  return (
    <>
      <div className="w-full bg-primary">
        <NavBar />
      </div>
      <div className="flex flex-col mb-10 items-center justify-center min-h-screen bg-gray-100 ">
        <div className="w-full mt-32 max-w-2xl mx-auto shadow-lg bg-white  overflow-hidden rounded-lg">
          <div className="flex justify-center items-center w-full h-64">
            <img
              alt="Internship"
              className="aspect-square object-cover"
              height={500}
              src={internship?.photoUrl}
              width={500}
            />
          </div>
          <div className="p-4 md:p-6 mt-32">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {internship?.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {internship?.description}
            </p>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2zm10-8H7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span>{new Date(internship?.startDate).toDateString()}</span>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2zm10-8H7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span>
                  {internship?.endDate
                    ? new Date(internship?.endDate).toDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span>
                  Category:
                  {internship?.department}
                </span>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2zm10-8H7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span>
                  Application Deadline:{" "}
                  {new Date(internship?.deadline).toDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button
                value={`/internships/${id}`}
                onClick={handleApply}
                className="px-4 py-2 border flex bg-primary text-white  mt-2 hover:bg-white hover:text-primary hover:border-primary duration-100 transition-all ease-in-out"
              >
                <AiOutlineArrowRight className="w-6 mt-1" />
                Apply
              </button>
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
    </>
  );
}
