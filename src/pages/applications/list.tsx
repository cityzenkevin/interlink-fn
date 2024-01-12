import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiCheckCircle } from "react-icons/hi2";

import Table from "../../components/Table";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import { fetchApiData, updateApiData } from "../../redux/features";
import Spinner from "../../components/Spinner";
import { AiFillEye } from "react-icons/ai";
import InternshipApplicationModal from "../../sections/internships/InternshipApplicationModal";
import StudentApplicationModal from "../../sections/applications/StudentApplicationModal";

const fieldState: fields = {};

userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Applications() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [reject, setReject] = useState(false);
  let [accept, setAccept] = useState(false);
  let [view, setView] = useState(false);
  let [studentView, setStudentView] = useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState<any>(fieldState);

  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const data = useAppSelector((state) => state.api);
  const { loading } = useAppSelector((state) => state.api);

  const handleRejectModal = () => {
    setReject(!reject);
  };

  const handleStudentView = () => {
    setStudentView(!studentView);
  };

  const handleAcceptModal = () => {
    setAccept(!accept);
  };

  const handleViewModal = () => {
    setView(!view);
  };

  useEffect(() => {
    dispatch(fetchApiData("/student/applications"));
  }, [dispatch]);

  const generateColumn = () => {
    const columns = [
      {
        Header: `${t("Internship Title")}`,
        accessor: "internship.title",
      },

      {
        Header: "Application date",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex flex-col">
            <span className="text-sm">
              {new Date(row.original?.createdAt).toLocaleDateString()}
            </span>
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "",
        Cell: ({ row }: any) => {
          const status = row.original?.state;
          console.log(status);
          switch (status) {
            case "PENDING":
              return (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  Pending
                </span>
              );
            case "APPROVED":
              return (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                  Accepted
                </span>
              );
            case "REJECTED":
              return (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                  Rejected
                </span>
              );
            default:
              return <span className="text-md text-yellow-500">Pending</span>;
          }
        },
      },
    ];

    if (user?.role == "ADMIN") {
      columns.unshift({
        Header: `${t("Student Title")}`,
        accessor: "",
        Cell: ({ row }: any) => (
          <span>
            {row.original?.student?.user?.firstName
              ? `${row.original?.student?.user?.firstName} ${row.original?.student?.user?.lastName}`
              : row.original?.user?.username}
          </span>
        ),
      });
      columns.push({
        Header: "Action",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex justify-evenly">
            <button
              className="flex text-white cursor-pointer  px-2 py-1 bg-blue-500 hover:text-blue-500 hover:bg-white hover:border-blue-500 border border-blue-500 rounded-md duration-100 transition-all ease-in"
              onClick={() => {
                setSelectedApplication(row.original);
                setView(true);
              }}
            >
              <AiFillEye className="w-5 mt-1 " />
              <span className="ml-2 "> {t("View")} </span>
            </button>
            <button
              disabled={row.original?.state == "APPROVED"}
              className={`flex text-white cursor-pointer  px-2 py-1  border  rounded-md duration-100 transition-all ease-in
              ${
                row.original?.state == "APPROVED"
                  ? "bg-gray-500 cursor-not-allowed"
                  : "border-primary cursor-pointer bg-primary hover:text-primary hover:bg-white  hover:border-primary"
              }
              
              `}
              onClick={() => {
                setSelectedApplication(row.original);
                setAccept(true);
              }}
            >
              <HiCheckCircle className="w-5 mt-1 " />
              <span className="ml-2"> {t("Accept")} </span>
            </button>
            <button
              disabled={row.original?.state == "REJECTED"}
              className={`flex ml-6 text-white cursor-pointer px-2 py-1  rounded-md duration-100 transition-all ease-in
                ${
                  row.original?.state == "REJECTED"
                    ? "bg-gray-500 cursor-not-allowed"
                    : "border-red-500 border cursor-pointer bg-red-500 hover:text-red-500 hover:bg-white  hover:border-red-500"
                }`}
              onClick={() => {
                setSelectedApplication(row.original);
                setReject(true);
              }}
            >
              <XMarkIcon className="w-5 mt-1" />
              <span className="ml-2  "> {t("Reject")} </span>
            </button>
          </div>
        ),
      });
    }
    if (user?.role == "STUDENT") {
      columns.push({
        Header: "Action",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex justify-evenly">
            <div
              className="flex text-white cursor-pointer  px-2 py-1 bg-primary hover:text-primary hover:bg-white hover:border-primary border border-primary rounded-md duration-100 transition-all ease-in"
              onClick={() => {
                setSelectedApplication(row.original);
                setStudentView(true);
              }}
            >
              <AiFillEye className="w-5 mt-1 " />
              <span className="ml-2 "> {t("View my application")} </span>
            </div>
          </div>
        ),
      });
    }

    return columns;
  };

  return (
    <div className="mt-28">
      {/* accept internship modal */}
      {selectedApplication && (
        <RemoveModal
          title="Accept Internship"
          onClose={handleAcceptModal}
          isOpen={accept}
          entity={{
            body: {},
            url: `/student/applications/${selectedApplication?.id}/accept`,
          }}
          onDelete={updateApiData}
          onFetch={fetchApiData("/student/applications")}
        />
      )}
      {/* accept internship modal
      
      {/* reject internship modal */}
      {selectedApplication && (
        <RemoveModal
          title="Reject Internship"
          onClose={handleRejectModal}
          isOpen={reject}
          entity={{
            body: {},
            url: `/student/applications/${selectedApplication?.id}/reject`,
          }}
          onDelete={updateApiData}
          onFetch={fetchApiData("/student/applications")}
        />
      )}
      {/* reject internship modal

      {/* view internship application Modal */}
      <InternshipApplicationModal
        isOpen={view}
        onClose={handleViewModal}
        internship={selectedApplication}
      />

      {/* view student internship application Modal */}
      <StudentApplicationModal
        onClose={handleStudentView}
        isOpen={studentView}
        application={selectedApplication}
      />
      {loading ? (
        <div className="ml-[44rem] mt-36">
          <Spinner />
        </div>
      ) : (
        <Table
          data={data?.applications ?? []}
          columns={generateColumn()}
          title="Applications"
          placeholder="Find by title, last description, or deadline"
        />
      )}
    </div>
  );
}
