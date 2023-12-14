import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus } from "react-icons/hi2";

import Table from "../../components/Table";

import Button from "../../components/Button";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import usersApi from "../../services/users.api";
import AddUserModal from "../../sections/users/AddUser";
import EditUserModal from "../../sections/users/EditUser";
import { deleteApiData, fetchApiData } from "../../redux/features";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../../components/Spinner";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Organizations() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOrg, setSelectedOrganization] = useState<any>(fieldState);

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
          {/* <div
            className="flex"
            onClick={() => {
              setSelectedOrganization(row.original);
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
              setSelectedOrganization(row.original?.id);
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
      {/* Add New org Modal */}
      <AddUserModal isOpen={isRegisterOpen} onClose={handleModal} />
      {/* Add New org Modal */}

      {/* Remove user modal */}
      {selectedOrg && (
        <RemoveModal
          title="Delete organization"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/organization/${selectedOrg}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/organizations")}
        />
      )}
      {/* Remove org modal

      {/* Edit org Modal */}
      <EditUserModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        user={selectedOrg}
      />
      {/* Edit org Modal */}

      {/* <div className="ml-60 mb-2 flex ">
        <Button
          variant="primary"
          size="md"
          onClick={handleModal}
          style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <HiPlus className="mt-[2px] w-6 h-5" />
          Add New Organization
        </Button>
      </div> */}
      {isLoading ? (
        <div className="ml-[44rem] mt-36">
          <Spinner />
        </div>
      ) : (
        <Table
          data={users ?? []}
          columns={columns}
          title="Organization"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
