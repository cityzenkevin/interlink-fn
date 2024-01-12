import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiOutlinePencil } from "react-icons/hi2";

import Table from "../../components/Table";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import { deleteApiData, fetchApiData } from "../../redux/features";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AiFillEye } from "react-icons/ai";
import InternshipApplicationModal from "../../sections/internships/InternshipApplicationModal";

const fieldState: fields = {};

userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Internships() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();

  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<any>(fieldState);

  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const data = useAppSelector((state) => state.api);
  const { loading } = useAppSelector((state) => state.api);

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/student/internship"));
  }, [dispatch]);

  const generateColumn = () => {
    const columns = [
      {
        Header: `${t("Title")}`,
        accessor: "title",
      },

      {
        Header: "Duration",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex flex-col">
            <span className="text-sm">
              {row.original.duration} {row.original.durationUnit}
            </span>
          </div>
        ),
      },
      {
        Header: "Application Deadline",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex flex-col">
            <span className="text-sm">
              {new Date(row.original.deadline).toDateString()}
            </span>
          </div>
        ),
      },
      {
        Header: "Internship Photo",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex flex-col text-blue-600">
            <a href={row.original.photoUrl} target="_blank">
              Photo
            </a>
          </div>
        ),
      },
      {
        Header: "Internship Document",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex flex-col text-blue-600">
            <a href={row.original.documentUrl} target="_blank">
              Document
            </a>
          </div>
        ),
      },
    ];

    if (user?.role == "ADMIN") {
      columns.push({
        Header: "Action",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex justify-evenly">
            <div
              className="flex text-white cursor-pointer  px-2 py-1 bg-primary hover:text-primary hover:bg-white hover:border-primary border border-primary rounded-md duration-100 transition-all ease-in"
              onClick={() => {
                navigate(`/dashboard/internships/${row.original?.id}/edit`, {
                  state: row.original,
                });
              }}
            >
              <HiOutlinePencil className="w-5 mt-1 " />
              <span className="ml-2 "> {t("Edit")} </span>
            </div>
            <div
              className="flex ml-6 text-white cursor-pointer px-2 py-1 bg-red-500 hover:text-red-500 hover:bg-white hover:border-red-500 border border-red-500 rounded-md duration-100 transition-all ease-in"
              onClick={() => {
                setSelectedInternship(row.original?.id);
                handleDeleteModal();
              }}
            >
              <XMarkIcon className="w-5  " />
              <span className="ml-2  "> {t("Delete")} </span>
            </div>
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
                setSelectedInternship(row.original);
                setIsEditOpen(true);
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
      {/* Remove internship modal */}
      {selectedInternship && (
        <RemoveModal
          title="Delete Internship"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/users/internship/${selectedInternship}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/student/internship")}
        />
      )}
      {/* Remove internship modal

      {/* Edit internship Modal */}
      <InternshipApplicationModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        internship={selectedInternship}
      />

      {/* Edit internship Modal */}
      {user?.role == "ADMIN" && (
        <div className="md:ml-52 mb-2">
          <Link to="/dashboard/internships/create">
            <button className="px-4 py-2 border bg-primary text-white hover:bg-white hover:border-primary hover:text-primary duration-100 transition-all ease-in">
              Add Internship
            </button>
          </Link>
        </div>
      )}
      {loading ? (
        <div className="ml-[44rem] mt-36">
          <Spinner />
        </div>
      ) : (
        <Table
          data={data?.internship ?? []}
          columns={generateColumn()}
          title="Internships"
          placeholder="Find by title, last description, or deadline"
        />
      )}
    </div>
  );
}
