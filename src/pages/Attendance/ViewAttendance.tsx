import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Table from "../../components/Table";

import logoImage from "../../assets/logo.png";
import { IProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchApiData } from "../../redux/features";
import { formatDateInWords } from "../../utils";
import Button from "../../components/Button";
import { AiOutlineDownload } from "react-icons/ai";

interface Attendance extends IProps {
  attendance: any;
}

export default function ViewAttendance({
  isOpen,
  onClose,
  attendance,
}: Attendance) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api);
  useEffect(() => {
    if (attendance?.date) {
      dispatch(fetchApiData(`/employees/attendances?date=${attendance?.date}`));
    }
  }, [isOpen]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text(`Attendance on ${formatDateInWords(attendance?.date)}`, 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["Employee Name", "Email", "Status"]],
      body: [
        ...data?.attendancesQuery?.map((attendance: any) => [
          `${attendance?.employees?.user?.firstname} ${attendance?.employees?.user?.lastname}`,
          attendance?.employees?.user?.email,
          attendance?.status ? "Present" : "Absent",
        ]),
      ],
      startY: 100,
    });

    doc.save(`${attendance?.date}_attendance_report.pdf`);
  };

  const columns = [
    {
      Header: "Employee Name",
      accessor: "employees.user.firstname",
      Cell: ({ row }: any) => (
        <div>
          <span>
            {row.original.employees?.user.firstname}{" "}
            {row.original.employees?.user.lastname}
          </span>
        </div>
      ),
    },
    {
      Header: "Email",
      accessor: "employees.user.email",
    },
    {
      Header: "Status",
      accessor: "",
      Cell: ({ row }: any) => (
        <div
          className={`
              px-2 py-1 rounded-md border
            ${
              row.original.status
                ? "border-green-500 text-green-500"
                : "border-blue-500 text-blue-500"
            }
          `}
        >
          <span>{row.original.status ? "Present" : "Absent"}</span>
        </div>
      ),
    },
  ];
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-screen items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full bg-white  md:min-h-[80vh] max-w-md md:max-w-[72vw] transform overflow-hidden rounded-2xl  text-left align-middle  transition-all">
                <div>
                  <div className="ml-40  mt-2 flex">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => generatePDF()}
                      style="p-2 ml-auto mr-8 mt-3 flex rounded-sm text-white bg-primary border border shadow-sm hover:bg-white hover:border-primary hover:text-primary"
                    >
                      <AiOutlineDownload className="w-6 h-6 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="-ml-48 px-4">
                    <Table
                      divStyles="mt-10 lg:ml-2 lg:w-[80%]"
                      data={data?.attendancesQuery ?? []}
                      title={`Attendance on ${formatDateInWords(
                        attendance?.date
                      )}`}
                      placeholder="Find by name "
                      columns={columns}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
