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

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Users() {
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
      accessor: "firstname",
    },
    {
      Header: `${t("Last Name")}`,
      accessor: "lastname",
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
          <div
            className="flex"
            onClick={() => {
              setSelectedUser(row.original);
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
          </div>
          <div
            className="flex ml-6"
            onClick={() => {
              setSelectedUser(row.original?.id);
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
          Add New User
        </Button>
      </div>
      {!isLoading && (
        <Table
          data={users ?? []}
          columns={columns}
          title="Users"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
