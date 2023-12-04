import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus } from "react-icons/hi2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Table from "../../components/Table";

import logoImage from "../../assets/logo.png";
import Button from "../../components/Button";
import { userFields } from "../../constants/formFields";
import { fields } from "../../types";
import { fetchApiData } from "../../redux/features";
import { formatDateInWords } from "../../utils";
import { Link } from "react-router-dom";
import UserAttendance from "./UserAttandance";
import { AiFillEye, AiOutlineDownload } from "react-icons/ai";
import ViewAttendance from "./ViewAttendance";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Leaves() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem("auth")!);
  let [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleViewOpen = () => {
    setIsViewOpen(!isViewOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/employees/attendances"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text(`Attendance`, 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["Attendance Date", "Number of present employees"]],
      body: [
        ...data?.attendances?.map((attendance: any) => [
          formatDateInWords(attendance.date),
          attendance._count.status,
        ]),
      ],
      startY: 100,
    });

    doc.save("attendance_report.pdf");
  };

  const generateColumns = (role: string) => {
    const columns = [
      {
        Header: "Attendance Date",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>{formatDateInWords(row.original.date)}</span>
          </div>
        ),
      },
      {
        Header: "Number of present employees",
        accessor: "_count.status",
      },
    ];

    if (role == "HR") {
      columns.push({
        Header: "Action",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex justify-evenly">
            <div
              className="flex"
              onClick={() => {
                setSelectedAttendance(row.original);
                setIsViewOpen(true);
              }}
            >
              <AiFillEye className="w-5  mt-1 text-primary cursor-pointer" />
              <span className="ml-2  cursor-pointer"> {t("View")} </span>
            </div>
          </div>
        ),
      });
    }
    return columns;
  };

  return (
    <div className="mt-28">
      <ViewAttendance
        isOpen={isViewOpen}
        onClose={handleViewOpen}
        attendance={selectedAttendance}
      />

      {userData?.role == "HR" && (
        <div className="ml-52 lg:ml-60 mb-2 flex ">
          <Link to="record">
            <Button
              variant="primary"
              size="md"
              style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
            >
              <HiPlus className="mt-[2px] w-6 h-5" />
              Record new attendance
            </Button>
          </Link>
          <Button
            variant="primary"
            size="md"
            onClick={generatePDF}
            style=" p-2 ml-auto mr-16 flex rounded-sm text-white border border-primary shadow-sm bg-primary hover:bg-white hover:text-primary "
          >
            <AiOutlineDownload className="mt-[2px] w-6 h-5" />
            Download
          </Button>
        </div>
      )}

      {!loading &&
        (userData?.role == "HR" ? (
          <Table
            data={data?.attendances ?? []}
            columns={generateColumns(userData?.role)}
            title="Attendance"
            placeholder="Find by name, email"
          />
        ) : (
          <UserAttendance
            loading={loading}
            attendanceData={data?.attendances}
          />
        ))}
    </div>
  );
}
