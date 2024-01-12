import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Table from "../../components/Table";

import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import EditUserModal from "../../sections/users/EditUser";
import { deleteApiData, fetchApiData } from "../../redux/features";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../../components/Spinner";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Students() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(fieldState);
  const data = useAppSelector((state) => state.api);
  const { loading } = data;

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/student"));
  }, [dispatch]);

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: `${t("First Name")}`,
      accessor: "user.firstName",
    },
    {
      Header: `${t("Last Name")}`,
      accessor: "user.lastName",
    },
    {
      Header: "Email",
      accessor: "user.email",
    },
    {
      Header: "Phone Number",
      accessor: "user.telephone",
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          {/* <div
            className="flex"
            onClick={() => {
              setSelectedStudent(row.original);
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
              setSelectedStudent(row.original?.id);
              handleDeleteModal();
            }}
          >
            <AiFillDelete className="w-5 mt-1 cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Delete")} </span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      {/* Remove user modal */}
      {selectedStudent && (
        <RemoveModal
          title="Delete student"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/student/${selectedStudent}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/student")}
        />
      )}
      {/* Remove user modal

      {/* Edit user Modal */}
      <EditUserModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        user={selectedStudent}
      />
      {/* Edit user Modal */}
      {loading ? (
        <div className="ml-[44rem] mt-36">
          <Spinner />
        </div>
      ) : (
        <Table
          data={data?.student ?? []}
          columns={columns}
          title="Students"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
