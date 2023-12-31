import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus, HiOutlinePencil } from "react-icons/hi2";

import Table from "../../components/Table";

import Button from "../../components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import usersApi from "../../services/users.api";
import AddUserModal from "../../sections/users/AddUser";
import EditUserModal from "../../sections/users/EditUser";
import { deleteApiData, fetchApiData } from "../../redux/features";
import Spinner from "../../components/Spinner";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Evaluations() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(fieldState);

  const { users, success, isLoading, error } = useAppSelector(
    (state) => state.users
  );

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
    dispatch(usersApi.getUsers());
  }, [success, error]);

  const columns = [
    {
      Header: `${t("First Name")}`,
      accessor: "firstName",
    },
    {
      Header: `${t("Last Name")}`,
      accessor: "lastName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Phone Number",
      accessor: "telephone",
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          {/* <div
            className="flex"
            onClick={() => {
              setSelectedUser(row.original);
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
              setSelectedUser(row.original?.id);
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
      {/* Add New user Modal */}
      <AddUserModal isOpen={isRegisterOpen} onClose={handleModal} />
      {/* Add New user Modal */}

      {/* Remove user modal */}
      {selectedUser && (
        <RemoveModal
          title="Delete user"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/users/${selectedUser}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/users")}
        />
      )}
      {/* Remove user modal

      {/* Edit user Modal */}
      <EditUserModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        user={selectedUser}
      />
      {/* Edit user Modal */}

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
      {isLoading ? (
        <div className="ml-[44rem] mt-36">
          <Spinner />
        </div>
      ) : (
        <Table
          data={users ?? []}
          columns={columns}
          title="Evaluation"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
