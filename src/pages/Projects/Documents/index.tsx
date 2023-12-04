import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { HiPlus } from "react-icons/hi2";

import Table from "../../../components/Table";

import Button from "../../../components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../../constants/formFields";
import RemoveModal from "../../../components/RemoveModal";
import { fields } from "../../../types";
import { deleteApiData, fetchApiData } from "../../../redux/features";
import CreateDocument from "./CreateDocument";
import { formatDateInWords } from "../../../utils";
import { Link } from "react-router-dom";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Documents() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [selectedDocument, setSelectedProject] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const userData = JSON.parse(localStorage.getItem("auth")!);

  const handleModal = () => {
    setRegisterIsOpen(!isRegisterOpen);
  };

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const viewDocument = (document: any) => {
    window.open(document?.url, "_blank");
  };

  useEffect(() => {
    dispatch(fetchApiData("/projects"));
    dispatch(fetchApiData("/skills"));
  }, [dispatch]);

  const columns = [
    {
      Header: `${t("Document Name")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <div
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            viewDocument(row.original);
          }}
        >
          {row.original.document_name}
        </div>
      ),
    },
    {
      Header: `${t("Category")}`,
      accessor: "category",
    },
    {
      Header: "Project Name",
      accessor: "project.project_name",
    },
    {
      Header: "Upload Date",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{formatDateInWords(row.original.upload_date)}</span>
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          <div
            className="flex ml-6"
            onClick={() => {
              setSelectedProject(row.original?.id);
              handleDeleteModal();
            }}
          >
            <XMarkIcon className="w-5  text-red-500 cursor-pointer" />
            <span className="ml-2 mb-2 cursor-pointer"> {t("Delete")} </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      <CreateDocument isOpen={isRegisterOpen} onClose={handleModal} />
      {/* Remove document modal */}
      {selectedDocument && (
        <RemoveModal
          title="Delete document"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/projects/documents/${selectedDocument}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/projects/documents")}
        />
      )}
      {/* Remove document modal */}

      {/* Edit Document Modal */}

      {/* Edit Document Modal */}

      <div className="ml-52 mb-2 flex ">
        {["FM", "PM", "EMPLOYEE"].includes(userData?.role) && (
          <Button
            variant="primary"
            size="md"
            style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
            onClick={handleModal}
          >
            <HiPlus className="mt-[2px] w-6 h-5" />
            Add New Document
          </Button>
        )}
      </div>
      {!loading && (
        <Table
          data={data?.documents ?? []}
          columns={columns}
          title="Documents"
          placeholder="Find by first name"
        />
      )}
    </div>
  );
}
