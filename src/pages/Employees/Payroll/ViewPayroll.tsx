import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import logoImage from "../../../assets/logo.png";
import Table from "../../../components/Table";
import { IProps } from "../../../types";
import { formatDateInWords } from "../../../utils";
import Button from "../../../components/Button";
import { AiOutlineDownload } from "react-icons/ai";

interface Payroll extends IProps {
  payroll: any;
}

export default function ViewPayroll({ isOpen, onClose, payroll }: Payroll) {
  const { t } = useTranslation();

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text(`Payroll on ${formatDateInWords(payroll?.date)}`, 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [["Employee Name", "Email", "Amount"]],
      body: [
        ...payroll?.employees?.map((employee: any) => [
          `${employee.user.firstname} ${employee.user.lastname}`,
          employee.user.email,
          employee.salary,
        ]),
      ],
      startY: 100,
    });

    doc.save(`${formatDateInWords(payroll?.date)}_attendance_report.pdf`);
  };

  const columns = [
    {
      Header: `${t("Employee Name")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>
            {row.original?.user.firstname} {row.original?.user.lastname}
          </span>
        </div>
      ),
    },
    {
      Header: `${t("Email")}`,
      accessor: "user.email",
    },

    {
      Header: "Amount",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{row.original?.salary} $</span>
        </div>
      ),
    },
    {
      Header: "Bank",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{row.original?.bankName}</span>
        </div>
      ),
    },
    {
      Header: "Account",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{row.original?.accountNumber}</span>
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
              <Dialog.Panel className="w-full  md:min-h-[80vh] bg-white max-w-md md:max-w-[72vw] transform overflow-hidden rounded-2xl  text-left align-middle  transition-all">
                <div className="mr-4">
                  <div className="ml-40  mt-2 flex">
                    <div className="text-lg font-bold pt-4">
                      Total Amount:{" "}
                      {payroll?.employees?.reduce((acc: any, curr: any) => {
                        return acc + curr.salary;
                      }, 0)}{" "}
                      Rwf
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => generatePDF()}
                      style="p-2 ml-auto flex rounded-sm text-white bg-primary border border shadow-sm hover:bg-white hover:border-primary hover:text-primary"
                    >
                      <AiOutlineDownload className="w-6 h-6 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="-ml-52 p-4">
                    <Table
                      divStyles="mt-10 lg:ml-2 lg:w-[95%]"
                      data={payroll?.employees ?? []}
                      title={`Payroll on ${formatDateInWords(payroll?.date)}`}
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
