import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { HiOutlinePencil, HiPlus } from "react-icons/hi2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Table from "../../../components/Table";

import logoImage from "../../../assets/logo.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { budgetFields } from "../../../constants/budget";
import RemoveModal from "../../../components/RemoveModal";
import { fields } from "../../../types";
import { deleteApiData, fetchApiData } from "../../../redux/features";
import Button from "../../../components/Button";
import { formatDateInWords } from "../../../utils";
import EditIncomeModal from "./EditIncome";
import AddIncome from "./CreateIncome";
import { AiOutlineDownload } from "react-icons/ai";

const fieldState: fields = {};
budgetFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Income() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIncome, setSelectedBudget] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

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
    dispatch(fetchApiData("/finance/incomes"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Income", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["Income Date", "Amount", "Income Source", "Description"]],
      body: [
        ...data?.incomes?.map((income: any) => [
          income?.income_date,
          `${income?.amount}Rwf`,
          income?.source,
          income?.description,
        ]),
      ],
      startY: 100,
    });

    doc.save("income.pdf");
  };

  const columns = [
    {
      Header: `${t("Income Date")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <div>{formatDateInWords(row.original?.income_date)}</div>
      ),
    },
    {
      Header: `${t("Amount")}`,
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{`${row.original?.amount} $` ?? "N/A"}</div>;
      },

    },
    {
      Header: "Income Source",
      accessor: "source",
    },
    {
      Header: "Description",
      accessor: "description",
    },

    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          <div
            className="flex"
            onClick={() => {
              setSelectedBudget(row.original);
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
          </div>
          {/* <div
            className="flex ml-6"
            onClick={() => {
              setSelectedBudget(row.original?.id);
              handleDeleteModal();
            }}
          >
            <XMarkIcon className="w-5  text-red-500 cursor-pointer" />
            <span className="ml-2 mb-2 cursor-pointer"> {t("Delete")} </span>
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      <AddIncome isOpen={isRegisterOpen} onClose={handleModal} />

      {/* Remove income modal */}
      {selectedIncome && (
        <RemoveModal
          title="Delete income"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/incomes/${selectedIncome}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/incomes")}
        />
      )}

      {/* Remove income modal */}

      {/* Edit Income Modal */}
      <EditIncomeModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        income={selectedIncome}
      />
      {/* Edit Income Modal */}
      <div className="ml-52 mb-2 flex ">
        <Button
          variant="primary"
          size="md"
          onClick={handleModal}
          style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <HiPlus className="mt-[2px] w-6 h-5" />
          Record New Income
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={generatePDF}
          style=" p-2 flex ml-auto mr-16 rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <AiOutlineDownload className="mt-[2px] w-6 h-5" />
          Download
        </Button>
      </div>
      {!loading && (
        <Table
          data={data?.incomes ?? []}
          columns={columns}
          title="income"
          placeholder="Find by name, amount, income"
        />
      )}
    </div>
  );
}
