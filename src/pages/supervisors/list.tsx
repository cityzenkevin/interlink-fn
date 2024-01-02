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
import { HiOutlinePencil, HiPlus } from "react-icons/hi2";
import AddSupervisorModal from "./add-supervisor";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Supervisors() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>(fieldState);

  const data = useAppSelector((state) => state.api);
  const { loading } = data;

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/users/supervisors"));
  }, [dispatch]);

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
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
      Header: "Phone Number",
      accessor: "telephone",
    },
    {
      Header: "Evaluations",
      accessor: "",
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          <div
            className="flex text-white cursor-pointer  px-2 py-1 bg-primary hover:text-primary hover:bg-white hover:border-primary border border-primary rounded-md duration-100 transition-all ease-in"
            onClick={() => {
              setSelectedSupervisor(row.original);
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5 mt-1 " />
            <span className="ml-2 "> {t("Edit")} </span>
          </div>
          <button
            className="flex ml-6 bg-red-600 text-white px-3 py-1 hover:text-red-500 hover:bg-white hover:border-red-500 border-2 border-red-600 rounded-md
             transition duration-300 ease-in-out
            "
            onClick={() => {
              setSelectedSupervisor(row.original?.id);
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
      <AddSupervisorModal onClose={handleAddModal} isOpen={addModal} />
      {/* Remove supervisor modal */}
      {selectedSupervisor && (
        <RemoveModal
          title="Delete supervisor"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/users/${selectedSupervisor}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/users/supervisors")}
        />
      )}
      {/* Remove supervisor modal

      {/* Edit supervisor Modal */}
      <EditUserModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        user={selectedSupervisor}
      />

      <div className="md:ml-52 mb-2">
        <button className="px-4 py-2 flex border bg-primary text-white hover:bg-white hover:border-primary hover:text-primary duration-100 transition-all ease-in"
         onClick={handleAddModal}
        >
          <HiPlus className="w-5 mt-1 cursor-pointer" />
          Add New Supervisor
        </button>
      </div>
      {/* Edit user Modal */}
      {loading ? (
        <div className="ml-[44rem] mt-36">
          <Spinner />
        </div>
      ) : (
        <Table
          data={data?.supervisors ?? []}
          columns={columns}
          title="Supervisors"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
