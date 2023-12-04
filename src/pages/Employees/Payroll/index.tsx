import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Table from "../../../components/Table";

import logoImage from "../../../assets/logo.png";
import { CheckIcon } from "@heroicons/react/24/outline";
import RemoveModal from "../../../components/RemoveModal";
import { fetchApiData, updateApiData } from "../../../redux/features";
import { formatDateInWords } from "../../../utils";
import { AiFillEye, AiOutlineDownload } from "react-icons/ai";
import ViewPayroll from "./ViewPayroll";
import Button from "../../../components/Button";

export default function Payroll() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<any>({});

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const userData = JSON.parse(localStorage.getItem("auth")!);

  const handleModal = () => {
    setRegisterIsOpen(!isRegisterOpen);
  };

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData(`/finance/payrolls`));
  }, []);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Payrolls ", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [
        [
          "Payment Request date",
          "Month",
          "Number of employees",
          "Total Amount",
          "Status",
        ],
      ],
      body: [
        ...data?.payrolls?.map((payroll: any) => [
          formatDateInWords(payroll.date),
          formatDateInWords(payroll.date).split("-")[1],
          payroll.employees.length,
          `${payroll.employees.reduce((acc: any, curr: any) => {
            return acc + curr.salary;
          }, 0)} Rwf`,
          payroll.status,
        ]),
      ],
      startY: 100,
    });

    doc.save("payroll_report.pdf");
  };

  const columns = [
    {
      Header: `${t("Payment Request date")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{formatDateInWords(row.original?.date)}</span>
        </div>
      ),
    },
    {
      Header: `${t("Month")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{formatDateInWords(row.original?.date).split("-")[1]}</span>
        </div>
      ),
    },

    {
      Header: "Number of employees",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{row.original?.employees.length}</span>
        </div>
      ),
    },
    {
      Header: "Total Amount",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>
            {row.original?.employees?.reduce((acc: any, curr: any) => {
              return acc + curr.salary;
            }, 0)}{" "}
            $
          </span>
        </div>
      ),
    },
    {
      Header: "Status",
      accessor: "",
      Cell: ({ row }: any) => (
        <div
          className={`
              px-2 py-1 rounded-md border
            ${row.original.status == "pending"
              ? "border-yellow-400 text-yellow-400"
              : row.original.status == "approved"
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }
          `}
        >
          <span>{row.original.status}</span>
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          <button
            className="flex border border-primary px-2 py-1 bg-primary text-white hover:bg-white hover:text-primary rounded-sm"
            onClick={() => {
              setSelectedPayroll(row.original);
              setRegisterIsOpen(true);
            }}
          >
            <AiFillEye className="w-5 mt-1 cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("View ")} </span>
          </button>
          {userData?.role == "FM" && (
            <div
              className={`flex ml-6 ${row.original?.status == "approved" ? "hidden" : "block"
                }`}
              onClick={() => {
                setSelectedPayroll(row.original?.payroll_id);
                handleDeleteModal();
              }}
            >
              <CheckIcon className={`w-5  text-green-500 cursor-pointer`} />
              <span className="ml-2 mt-1 cursor-pointer"> {t("Approve")} </span>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      <ViewPayroll
        isOpen={isRegisterOpen}
        onClose={handleModal}
        payroll={selectedPayroll}
      />
      {/* Remove payroll modal */}
      {selectedPayroll && (
        <RemoveModal
          title="Approve payment"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={{
            body: {
              status: "approved",
            },
            url: `/finance/payrolls/${selectedPayroll}`,
          }}
          onFetch={fetchApiData("/finance/payrolls")}
          onDelete={updateApiData}
        />
      )}

      {/* Remove payroll modal */}
      {userData?.role == "HR" && (
        <Button
          variant="primary"
          size="md"
          onClick={generatePDF}
          style=" p-2 ml-auto mb-2 mr-16 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <AiOutlineDownload className="mt-[2px] w-6 h-5" />
          Download
        </Button>
      )}

      {!loading && (
        <Table
          data={
            userData?.role == "FM"
              ? (data?.payrolls &&
                data?.payrolls?.filter(
                  (payroll: any) => payroll.status === "pending"
                )) ??
              []
              : data?.payrolls ?? []
          }
          columns={columns}
          title="Payroll"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}