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
import EditExpenseModal from "./EditExpense";
import AddExpense from "./CreateExpense";
import Button from "../../../components/Button";
import { formatDateInWords } from "../../../utils";
import { AiOutlineDownload } from "react-icons/ai";

const fieldState: fields = {};
budgetFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Expenses() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleModal = () => {
    setRegisterIsOpen(!isRegisterOpen);
  };
  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const viewDocument = (document: any) => {
    window.open(document?.url, "_blank");
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/finance/expenses"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Expenses", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["Expense Date", "Amount", "Expense Category", "Description"]],
      body: [
        ...data?.expenses?.map((expense: any) => [
          formatDateInWords(expense?.expense_date),
          `${expense?.amount}Rwf`,
          expense?.category,
          expense?.description,
        ]),
      ],
      startY: 100,
    });

    doc.save("expenses.pdf");
  };

  const columns = [
    {
      Header: `${t("Expense Date")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <div>{formatDateInWords(row.original?.expense_date)}</div>
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
      Header: "Expense Category",
      accessor: "category",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Expense Document",
      accessor: "",
      Cell: ({ row }: any) => (
        <div
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            viewDocument(row.original);
          }}
        >
          Expense Document
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
              setSelectedExpense(row.original);
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
          </div>
          <div
            className="flex ml-6"
            onClick={() => {
              setSelectedExpense(row.original?.id);
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
      <AddExpense isOpen={isRegisterOpen} onClose={handleModal} />

      {/* Remove expense modal */}
      {selectedExpense && (
        <RemoveModal
          title="Delete expense"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/finance/expenses/${selectedExpense}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/finance/expenses")}
        />
      )}
      {/* Remove expense modal */}

      {/* Edit Expense Modal */}
      <EditExpenseModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        expense={selectedExpense}
      />
      {/* Edit Expense Modal */}
      <div className="ml-52 mb-2 flex ">
        <Button
          variant="primary"
          size="md"
          onClick={handleModal}
          style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <HiPlus className="mt-[2px] w-6 h-5" />
          Add New Expense
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
          data={data?.expenses ?? []}
          columns={columns}
          title="Expenses"
          placeholder="Find by name, amount, expense"
        />
      )}
    </div>
  );
}
