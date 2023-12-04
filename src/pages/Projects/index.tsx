import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { HiPlus, HiOutlinePencil } from "react-icons/hi2";
import { AiOutlineDownload, AiOutlineSend } from "react-icons/ai";

import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

import Table from "../../components/Table";

import logoImage from "../../assets/logo.png";
import Button from "../../components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFields } from "../../constants/formFields";
import RemoveModal from "../../components/RemoveModal";
import { fields } from "../../types";
import { deleteApiData, fetchApiData } from "../../redux/features";
import { Link } from "react-router-dom";
import { formatDateInWords } from "../../utils";
import { UserContext } from "../../hooks/useAuth";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Projects() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(fieldState);

  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const { user } = useContext(UserContext);

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  useEffect(() => {
    dispatch(fetchApiData("/projects"));
    dispatch(fetchApiData("/skills"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Projects", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [
        [
          "Project ",
          "Type",
          "Start Date",
          "End Date",
          "Manager",
          "Team Members",
          "Status",
        ],
      ],
      body: [
        ...data?.projects.map((project: any) => [
          project.project_name,
          project.type,
          formatDateInWords(project.start_date),
          formatDateInWords(project.end_date),
          project.manager.user.firstname + " " + project.manager.user.lastname,
          project.teamMembers
            .map((member: any) => member.user.firstname)
            .join(", "),
          project.status,
        ]),
      ],
      startY: 100,
    });

    doc.save("projects_report.pdf");
  };

  const generateColumns = () => {
    const columns = [
      {
        Header: `${t("Project Name")}`,
        accessor: "project_name",
      },
      {
        Header: `${t("Type")}`,
        accessor: "type",
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
        Header: "Manager",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>
              {row.original.manager.user.firstname}{" "}
              {row.original.manager.user.lastname}
            </span>
          </div>
        ),
      },
      {
        Header: "Team Members",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span>
              {row.original.teamMembers
                .map((member: any) => member.user.firstname)
                .join(", ")}
            </span>
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "",
        Cell: ({ row }: any) => (
          <div>
            <span
              className={`px-2 py-1 text-white
               ${
                 row.original?.status == "Completed"
                   ? "bg-green-500"
                   : "bg-blue-500"
               }
             `}
            >
              {row.original.status}
            </span>
          </div>
        ),
      },
    ];
    if (user?.role == "PM") {
      columns.push({
        Header: "Action",
        accessor: "",
        Cell: ({ row }: any) => (
          <div className="flex justify-evenly">
            <Link to={row.original.id}>
              <div className="flex">
                <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
                <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
              </div>
            </Link>
            <div
              className="flex ml-6"
              onClick={() => {
                setSelectedProject(row.original?.id);
                handleDeleteModal();
              }}
            >
              <XMarkIcon className="w-5  text-red-500 cursor-pointer" />
              <span className="ml-2 mb-2 cursor-pointer"> {t("Delete")} </span>
            </div>
          </div>
        ),
      });
    }
    return columns;
  };

  return (
    <div className="mt-28">
      {/* Remove project modal */}
      {selectedProject && (
        <RemoveModal
          title="Delete project"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/projects/${selectedProject}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/projects")}
        />
      )}
      {/* Remove project modal */}

      <div className="ml-52 mb-2 flex ">
        {user?.role === "PM" ? (
          <>
            <Button
              variant="primary"
              size="md"
              style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
            >
              <HiPlus className="mt-[2px] w-6 h-5" />
              <Link to="add"> Add New Project </Link>
            </Button>
            <Button
              variant="primary"
              size="md"
              style=" p-2 ml-2 flex rounded-sm text-white bg-primary border border-primary shadow-sm hover:bg-white hover:text-primary "
            >
              <AiOutlineSend className="mt-[2px] w-6 h-5" />
              <Link to="/dashboard/budget/allocate"> Allocate Budget </Link>
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={generatePDF}
              style=" p-2 ml-auto mr-16 flex rounded-sm text-white bg-primary border border-primary shadow-sm hover:bg-white hover:text-primary "
            >
              <AiOutlineDownload className="mt-[2px] w-6 h-5" />
              Download
            </Button>
          </>
        ) : null}
      </div>
      {!loading && (
        <Table
          data={data?.projects ?? []}
          columns={generateColumns()}
          title="Projects"
          placeholder="Find by first name, manager"
        />
      )}
    </div>
  );
}
