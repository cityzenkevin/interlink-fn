import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus, HiOutlinePencil } from "react-icons/hi2";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

import Table from "../../components/Table";

import logoImage from "../../assets/logo.png";
import Button from "../../components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import { deleteApiData, fetchApiData } from "../../redux/features";
import AddVolunteerModal from "./AddVolunteer";
import EditVolunteerModal from "./EditVolunteer";
import { AiOutlineDownload } from "react-icons/ai";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Volunteers() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleModal = () => {
    console.log("1");
    setRegisterIsOpen(!isRegisterOpen);
  };

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };
  useEffect(() => {
    dispatch(fetchApiData("/volunteers"));
    dispatch(fetchApiData("/skills"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Volunteers", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["First Name", "Last Name", "Email", "Telephone", "Skills"]],
      body: [
        ...data?.volunteers.map((volunteer: any) => [
          volunteer.firstname,
          volunteer.lastname,
          volunteer.email,
          volunteer.telephone,
          volunteer.skills.map((skill: any) => skill.name).join(", "),
        ]),
      ],
      startY: 100,
    });

    doc.save("list_of_volunteers.pdf");
  };

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
      Header: "Telephone ",
      accessor: "telephone",
    },
    {
      Header: "Skills",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex flex-wrap  items-start">
          {row.original.skills.map((skill: any) => (
            <span className="mx-2 my-1 text-white bg-primary px-1 rounded-md">
              {skill?.name}
            </span>
          ))}
        </div>
      ),
    },

    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          <div
            className="flex"
            onClick={() => {
              setSelectedVolunteer(row.original);
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
          </div>
          <div
            className="flex ml-6"
            onClick={() => {
              setSelectedVolunteer(row.original?.id);
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
      {/* Add New Volunteer Modal */}
      <AddVolunteerModal isOpen={isRegisterOpen} onClose={handleModal} />
      {/* Add New Volunteer Modal */}
      {/* Remove volunteer modal */}
      {selectedVolunteer && (
        <RemoveModal
          title="Delete volunteer"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/volunteers/${selectedVolunteer}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/volunteers")}
        />
      )}
      {/* Remove volunteer modal */}
      <EditVolunteerModal
        volunteer={selectedVolunteer}
        isOpen={isEditOpen}
        onClose={handleEditModal}
      />
      {/* Edit Volunteer Modal */}

      {/* Edit Volunteer Modal */}

      <div className="ml-60 mb-2 flex ">
        <Button
          variant="primary"
          size="md"
          onClick={handleModal}
          style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <HiPlus className="mt-[2px] w-6 h-5" />
          Add New Volunteer
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={generatePDF}
          style=" p-2 ml-auto mr-16 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <AiOutlineDownload className="mt-[2px] w-6 h-5" />
          Download
        </Button>
      </div>
      {!loading && (
        <Table
          data={data?.volunteers ?? []}
          columns={columns}
          title="Volunteers"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
