import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus } from "react-icons/hi2";

import Table from "../../components/Table";

import Button from "../../components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import EditUserModal from "../../sections/users/EditUser";
import { deleteApiData, fetchApiData } from "../../redux/features";
import Spinner from "../../components/Spinner";
import NewEvaluationModal from "../../sections/evaluation/new-evaluation";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Evaluations() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const data = useAppSelector((state) => state.api);

  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedEvaluation, seteSelectedEvaluation] =
    useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);

  const handleModal = () => {
    setRegisterIsOpen(!isRegisterOpen);
  };

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/student/evaluation"));
  }, [dispatch]);

  const columns = [
    {
      Header: `${t("Student ")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">
            {row.original?.application?.student?.user?.firstName}{" "}
            {row.original?.application?.student?.user?.lastName}
          </span>
          <span className="text-sm text-gray-500">
            {row.original?.application?.student?.user?.email}
          </span>
        </div>
      ),
    },
    {
      Header: "internship Title",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">
            {row.original?.application?.internship?.title}
          </span>
        </div>
      ),
    },
    {
      Header: "Score",
      accessor: "",
      Cell: ({ row }: any) => {
        const score = row.original?.score;
        switch (true) {
          case score < 50:
            return (
              <div className="flex flex-col">
                <span className="text-sm  text-red-500">{score}</span>
              </div>
            );
          case score > 50 && score < 70:
            return (
              <div className="flex flex-col">
                <span className="text-sm text-yellow-500">{score}</span>
              </div>
            );
          case score > 70:
            return (
              <div className="flex flex-col">
                <span className="text-sm  text-green-500">{score}</span>
              </div>
            );
        }
      },
    },
    {
      Header: "Comment ",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">
            {row.original?.comment ?? "No comment"}
          </span>
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          {/* <div
            className="flex"
            onClick={() => {
              seteSelectedEvaluation(row.original);
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
          </div> */}
          <button
            className="flex ml-6 bg-red-600 text-white px-3 py-1 hover:text-red-500 hover:bg-white hover:border-red-500 border-2 border-red-600 rounded-md
          transition duration-300 ease-in-out
         "
            onClick={() => {
              seteSelectedEvaluation(row.original?.id);
              handleDeleteModal();
            }}
          >
            <XMarkIcon className="w-5  cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Delete")} </span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      {/*make new evaluation */}
      <NewEvaluationModal isOpen={isRegisterOpen} onClose={handleModal} />
      {/*make new evaluation */}

      {/* Remove evaluation modal */}
      {selectedEvaluation && (
        <RemoveModal
          title="Delete evaluation"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/student/evaluation/${selectedEvaluation}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/student/evaluation")}
        />
      )}
      {/* Remove user modal

      {/* Edit user Modal */}
      <EditUserModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        user={selectedEvaluation}
      />
      {/* Edit user Modal */}

      {user?.role === "SUPERVISOR" && (
        <div className="ml-60 mb-2 flex ">
          <Button
            variant="primary"
            size="md"
            onClick={handleModal}
            style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
          >
            <HiPlus className="mt-[2px] w-6 h-5" />
            Make New Evaluation
          </Button>
        </div>
      )}
      {loading ? (
        <div className="ml-[44rem] mt-36">
          <Spinner />
        </div>
      ) : (
        <Table
          data={data?.evaluation ?? []}
          columns={columns}
          title="Evaluation"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
