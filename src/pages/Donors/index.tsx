import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiOutlinePencil } from "react-icons/hi2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Table from "../../components/Table";

import logoImage from "../../assets/logo.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import { deleteApiData, fetchApiData } from "../../redux/features";
import EditDonorModal from "./EditDonor";
import { donorFields } from "../../constants/finance";
import Button from "../../components/Button";
import { AiOutlineDownload } from "react-icons/ai";

const fieldState: fields = {};

donorFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Donors() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/users/donor"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Donors", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["Donor Names", "Email", "Telephone", "Address"]],
      body: [
        ...data?.donor?.map((donor: any) => [
          donor?.donorName,
          donor?.email,
          donor?.telephone,
          donor?.address,
        ]),
      ],
      startY: 100,
    });

    doc.save("list_of_donors.pdf");
  };

  const columns = [
    {
      Header: `${t("Donor Names")}`,
      accessor: "donorName",
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
      Header: "Address",
      accessor: "address",
    },

    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          <div
            className="flex"
            onClick={() => {
              setSelectedDonor({
                id: row.original?.id,
                donorName: row.original?.donorName,
                email: row.original?.email,
                telephone: row.original?.telephone,
                address: row.original?.address,
                organization: row.original?.organization,
              });
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
          </div>
          <div
            className="flex ml-6"
            onClick={() => {
              setSelectedDonor(row.original?.id);
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
      {/* Remove donor modal */}
      {selectedDonor && (
        <RemoveModal
          title="Delete donor"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/users/donor/${selectedDonor}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/users/donor")}
        />
      )}
      {/* Remove donor modal */}

      {/* Edit Donor Modal */}
      {selectedDonor && (
        <EditDonorModal
          isOpen={isEditOpen}
          onClose={handleEditModal}
          donor={selectedDonor}
        />
      )}
      {/* Edit Donor Modal */}
      <div className="md:ml-52 mb-2">
      <Button
        variant="primary"
        size="md"
        onClick={generatePDF}
        style=" p-2 ml-3 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
      >
        <AiOutlineDownload className="mt-[2px] w-6 h-5" />
        Download
      </Button>
      </div>
      {!loading && (
        <Table
          data={data?.donor ?? []}
          columns={columns}
          title="Donors"
          placeholder="Find by names, email, telephone, address"
        />
      )}
    </div>
  );
}
