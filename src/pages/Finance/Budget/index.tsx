import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { HiOutlinePencil } from "react-icons/hi2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Table from "../../../components/Table";

import logoImage from "../../../assets/logo.png";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { budgetFields } from "../../../constants/budget";
import RemoveModal from "../../../components/RemoveModal";
import { fields } from "../../../types";
import { deleteApiData, fetchApiData } from "../../../redux/features";
import EditBudgetModal from "./EditBudget";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { AiOutlineDownload } from "react-icons/ai";

const fieldState: fields = {};
budgetFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Budgets() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(fieldState);
  console.log(selectedBudget);
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/finance/budgets"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Budget", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["Budget Name", "Amount", "Project Name", "Program"]],
      body: [
        ...data?.budgets?.map((budget: any) => [
          budget?.budget_name,
          budget?.amount,
          budget?.projects
            ?.map((project: any) => project?.project_name)
            .join(", "),
          budget?.program,
        ]),
      ],
      startY: 100,
    });

    doc.save("Budget.pdf");
  };

  const columns = [
    {
      Header: `${t("Budget Name")}`,
      accessor: "budget_name",
    },
    {
      Header: `${t("Amount")}`,
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{`${row.original?.amount} $` ?? "N/A"}</div>;
      },
    },
    {
      Header: "Project Name",
      accessor: "",
      Cell: ({ row }: any) => {
        return (
          <div>
            {row.original?.projects
              ? row.original?.projects
                ?.map((project: any) => project?.project_name)
                .join(", ")
              : "N/A"}
          </div>
        );
      },
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
          <div
            className="flex ml-6"
            onClick={() => {
              setSelectedBudget(row.original?.id);
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
      {/* Remove budget modal */}
      {selectedBudget && (
        <RemoveModal
          title="Delete budget"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/finance/budgets/${selectedBudget}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/finance/budgets")}
        />
      )}
      {/* Remove budget modal */}

      {/* Edit Budget Modal */}
      <EditBudgetModal
        isOpen={isEditOpen}
        onClose={handleEditModal}
        budget={selectedBudget}
      />
      {/* Edit Budget Modal */}
      <div className="md:ml-60 my-2 flex justify-around">
        <Link to="/dashboard/budget/allocations" className="">
          <Button
            variant="primary"
            size="md"
            style=" p-2  flex rounded-sm text-white border border-primary bg-primary shadow-sm hover:bg-white hover:text-primary "
          >
            <EyeIcon className="mt-[2px] w-6 h-5" />
            View Budget Allocations
          </Button>
        </Link>
        <Button
          variant="primary"
          size="md"
          onClick={generatePDF}
          style=" p-2 ml-auto mr-16 flex rounded-sm text-white border border-primary bg-primary shadow-sm hover:bg-white hover:text-primary "
        >
          <AiOutlineDownload className="mt-[2px] w-6 h-5" />
          Download
        </Button>
      </div>
      {!loading && (
        <Table
          data={data?.budgets ?? []}
          columns={columns}
          title="Budgets"
          placeholder="Find by name, amount, budget"
        />
      )}
    </div>
  );
}
