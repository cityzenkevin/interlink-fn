import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus } from "react-icons/hi2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Table from "../../components/Table";

import logoImage from "../../assets/logo.png";
import Button from "../../components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import { fetchApiData, updateApiData } from "../../redux/features";
import RequestLeave from "./RequestLeave";
import { formatDateInWords } from "../../utils";
import { AiOutlineCheck, AiOutlineDownload } from "react-icons/ai";
import RejectLeave from "./RejectLeave";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Leaves() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem("auth")!);
  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isApproveOpen, setIsApproveOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleModal = () => {
    setRegisterIsOpen(!isRegisterOpen);
  };

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleApproveModal = () => {
    setIsApproveOpen(!isApproveOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/employees/leaveRequests"));
    dispatch(fetchApiData("/skills"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text(`Leave Request`, 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [
        [
          "Email",
          "Start Date",
          "End Date",
          "Type",
          "Leave request Reason",
          "Rejection reason",
          "Status",
        ],
      ],
      body: [
        ...data?.leaveRequests?.map((leave: any) => [
          leave.employee.user.email,
          formatDateInWords(leave.start_date),
          formatDateInWords(leave.end_date),
          leave.leave_type,
          leave.reason,
          leave.rejection_reason,
          leave.status,
        ]),
      ],
      startY: 100,
    });

    doc.save("leave_requests.pdf");
  };

  const generateColumns = (role: string) => {
    const columns = [
      {
        Header: "Email",
        accessor: "employee.user.email",
      },
      {
        Header: "Start Date",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>{formatDateInWords(row.original.start_date)}</span>
          </div>
        ),
      },
      {
        Header: "End Date",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>{formatDateInWords(row.original.end_date)}</span>
          </div>
        ),
      },
      {
        Header: "Type",
        accessor: "leave_type",
      },
      {
        Header: "Leave request Reason",
        accessor: "reason",
      },
      {
        Header: "Rejection reason",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>
              {row.original.status == "Rejected"
                ? row.original.rejection_reason
                : "N/A"}
            </span>
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "",
        Cell: ({ row }: any) => (
          <span
            className={`text-white text-base  px-2 py-1 rounded-md ${
              row.original.status === "Approved"
                ? "bg-green-500"
                : row.original.status === "Rejected"
                ? "bg-red-500"
                : "bg-yellow-400"
            }`}
          >
            {row.original.status}
          </span>
        ),
      },
    ];

    if (role == "HR") {
      columns.push({
        Header: "Action",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex justify-evenly">
            <button
              type="button"
              disabled={
                row.original.status === "Approved" ||
                row.original.status === "Rejected"
              }
              className={`flex  border border-primary p-1 curs text-primary ${
                (row.original.status === "Approved" ||
                  row.original.status === "Rejected") &&
                "cursor-not-allowed"
              }`}
              onClick={() => {
                setSelectedLeave(row.original?.id);
                setIsApproveOpen(true);
              }}
            >
              <AiOutlineCheck
                className={`w-5 mt-1 text-primary ${
                  row.original.status === "Approved" ||
                  row.original.status === "Rejected"
                    ? "cursor-not-allowed"
                    : "cursor-pointer "
                }`}
              />
              <span
                className={`ml-1  text-primary  ${
                  row.original.status === "Approved" ||
                  row.original.status === "Rejected"
                    ? "cursor-not-allowed"
                    : "cursor-pointer "
                }`}
              >
                {t("Approve")}{" "}
              </span>
            </button>
            <button
              type="button"
              disabled={
                row.original.status === "Approved" ||
                row.original.status === "Rejected"
              }
              className="flex ml-6 border border-red-500 p-1"
              onClick={() => {
                setSelectedLeave(row.original?.id);
                handleDeleteModal();
              }}
            >
              <XMarkIcon
                className={`w-5 mt-1  text-red-500  ${
                  row.original.status === "Approved" ||
                  row.original.status === "Rejected"
                    ? "cursor-not-allowed"
                    : "cursor-pointer "
                }`}
              />
              <span
                className={`ml-1 cursor-pointer text-red-500 ${
                  row.original.status === "Approved" ||
                  row.original.status === "Rejected"
                    ? "cursor-not-allowed"
                    : "cursor-pointer "
                }`}
              >
                {" "}
                {t("Reject")}{" "}
              </span>
            </button>
          </div>
        ),
      });
    }
    return columns;
  };

  return (
    <div className="mt-28">
      {/* Add New Leave Modal */}
      <RequestLeave isOpen={isRegisterOpen} onClose={handleModal} />
      {selectedLeave && (
        <RejectLeave
          isOpen={isRemoveOpen}
          onClose={handleDeleteModal}
          leave={selectedLeave}
        />
      )}
      {/* Add New Leave Modal */}

      {/* approve leave request  modal */}
      {selectedLeave && (
        <RemoveModal
          title="Approve leave request"
          onClose={handleApproveModal}
          isOpen={isApproveOpen}
          entity={{
            url: `/employees/leaveRequests/${selectedLeave}/approve`,
            body: { status: "Approved" },
          }}
          onDelete={updateApiData}
          onFetch={fetchApiData("/employees/leaveRequests")}
        />
      )}
      {/* approve leave request  modal */}
      {/* Edit Leave Modal */}

      {/* Edit Leave Modal */}
      {["FM", "EMPLOYEE"].includes(userData?.role) && (
        <div className="ml-52 mb-2 flex ">
          <Button
            variant="primary"
            size="md"
            onClick={handleModal}
            style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
          >
            <HiPlus className="mt-[2px] w-6 h-5" />
            New Leave Request
          </Button>
        </div>
      )}
      <div>
        <Button
          variant="primary"
          size="md"
          onClick={generatePDF}
          style=" p-2 ml-auto mb-2 mr-16 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <AiOutlineDownload className="mt-[2px] w-6 h-5" />
          Download
        </Button>
      </div>
      {!loading && (
        <Table
          data={data?.leaveRequests ?? []}
          columns={generateColumns(userData?.role)}
          title={`${
            ["FM", "EMPLOYEE"].includes(userData?.role) ? "My" : "All"
          } Leaves requests`}
          placeholder="Find by first name, last name, or email, date"
        />
      )}
    </div>
  );
}
