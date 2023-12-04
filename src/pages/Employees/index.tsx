import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus, HiOutlinePencil } from "react-icons/hi2";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

import Table from "../../components/Table";

import logoImage from "../../assets/logo.png";
import Button from "../../components/Button";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import { deleteApiData, fetchApiData } from "../../redux/features";
import AddEmployeeModal from "./AddEmployee";
import { AiOutlineDownload } from "react-icons/ai";

const fieldState: fields = {};

userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Employees() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleModal = () => {
    setRegisterIsOpen(!isRegisterOpen);
  };

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/employees"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Employees", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [
        [
          "First Name",
          "Last Name",
          "Email",
          "Telephone",
          "Job Title",
          "Salary",
        ],
      ],
      body: [
        ...data?.employees.map((employee: any) => [
          employee.user.firstname,
          employee.user.lastname,
          employee.user.email,
          employee.user.telephone,
          employee.job_title,
          employee.salary,
        ]),
      ],
      startY: 100,
    });

    doc.save("list_of_employees.pdf");
  };

  const columns = [
    {
      Header: `${t("First Name")}`,
      accessor: "",
      Cell: ({ row }: any) => (
        <Link to={`/dashboard/profile/${row.original?.user?.id}`}>
          <div className="text-blue-500 cursor-pointer">
            {row.original?.user?.firstname}
          </div>
        </Link>
      ),
    },
    {
      Header: `${t("Last Name")}`,
      accessor: "user.lastname",
    },
    {
      Header: "Email",
      accessor: "user.email",
    },
    {
      Header: "Telephone ",
      accessor: "user.telephone",
    },
    {
      Header: "Job Title",
      accessor: "job_title",
    },

    {
      Header: "Salary",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{`${row.original?.salary} $` ?? "N/A"}</div>;
      },
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }: any) => (
        <div className="flex justify-evenly">
          <Link to={`/dashboard/employees/${row.original?.id}`}>
            <div className="flex">
              <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
              <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
            </div>
          </Link>
          <div
            className="flex ml-6"
            onClick={() => {
              setSelectedEmployee(row.original?.user?.id);
              handleDeleteModal();
            }}
          >
            <XMarkIcon className="w-5  text-red-500 cursor-pointer" />
            <span className="ml-2 mb-2 cursor-pointer">
              {" "}
              {t("Terminate Contract")}{" "}
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      {/* Add New Employee Modal */}
      <AddEmployeeModal isOpen={isRegisterOpen} onClose={handleModal} />
      {/* Add New Employee Modal */}

      {/* Remove employee modal */}
      {selectedEmployee && (
        <RemoveModal
          title="Delete employee"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/employees/${selectedEmployee}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/employees")}
        />
      )}
      {/* Remove employee modal */}

      <div className="ml-60 mb-2 flex ">
        <Button
          variant="primary"
          size="md"
          onClick={handleModal}
          style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <HiPlus className="mt-[2px] w-6 h-5" />
          Add New Employee
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={generatePDF}
          style=" p-2 ml-3 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <AiOutlineDownload className="mt-[2px] w-6 h-5" />
          Download
        </Button>
        <Link to="/dashboard/employees/terminated" className="ml-auto mr-20">
          <Button
            variant="primary"
            size="md"
            style=" p-2  flex rounded-sm text-white border border-primary bg-primary shadow-sm hover:bg-white hover:text-primary "
          >
            <EyeIcon className="mt-[2px] w-6 h-5" />
            View Terminated Employees
          </Button>
        </Link>
      </div>
      {!loading && (
        <Table
          data={
            data?.employees?.filter(
              (employee: any) => employee?.user?.deleted == null
            ) ?? []
          }
          columns={columns}
          title="Employees"
          placeholder="Find by first name, last name, or email"
        />
      )}
    </div>
  );
}
