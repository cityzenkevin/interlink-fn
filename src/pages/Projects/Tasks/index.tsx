import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { HiPlus, HiOutlinePencil } from "react-icons/hi2";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

import Table from "../../../components/Table";

import logoImage from "../../../assets/logo.png";
import Button from "../../../components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import RemoveModal from "../../../components/RemoveModal";
import { deleteApiData, fetchApiData } from "../../../redux/features";
import CreateTaskModal from "./CreateTask";
import { formatDateInWords } from "../../../utils";
import { UserContext } from "../../../hooks/useAuth";
import EditTaskModal from "./EditTask";
import { AiOutlineDownload } from "react-icons/ai";

export default function Tasks() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  let [isRegisterOpen, setRegisterIsOpen] = useState(false);
  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>({});

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
    dispatch(fetchApiData("/projects/tasks"));
  }, [dispatch]);

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);

    doc.text("Tasks", 60, 60);

    // Add the image to the document
    const imgWidth = 100;
    const imgHeight = 50;
    const xPos = 450;
    const yPos = 30;

    doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

    autoTable(doc, {
      head: [
        [
          "Task Name",
          "Description",
          "Project Name",
          "Assigned to",
          "Due Date",
          "Priority",
          "Status",
        ],
      ],
      body: [
        ...data?.tasks.map((task: any) => [
          task.task_name,
          task.description,
          task.project.project_name,
          task.employee.user.firstname,
          formatDateInWords(task.due_date),
          task.priority,
          task.status,
        ]),
      ],
      startY: 100,
    });

    doc.save("tasks_report.pdf");
  };

  const columns = [
    {
      Header: `${t("Task Name")}`,
      accessor: "task_name",
    },
    {
      Header: `${t("Description ")}`,
      accessor: "description",
    },
    {
      Header: "Project Name",
      accessor: "project.project_name",
    },
    {
      Header: "Assigned to ",
      accessor: "employee.user.firstname",
    },
    {
      Header: "Due Date ",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          <span>{formatDateInWords(row.original.due_date)}</span>
        </div>
      ),
    },
    {
      Header: "Priority",
      accessor: "priority",
    },
    {
      Header: "Status",
      accessor: "",
      Cell: ({ row }: any) => (
        <div
          className={`
          px-2 py-1 rounded-md border
          ${
            row.original.status === "Completed"
              ? "border-green-500 text-green-500"
              : "border-blue-500 text-blue-500"
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
          <div
            className="flex"
            onClick={() => {
              setSelectedTask(row.original);
              setIsEditOpen(true);
            }}
          >
            <HiOutlinePencil className="w-5  text-primary cursor-pointer" />
            <span className="ml-2  cursor-pointer"> {t("Edit")} </span>
          </div>
          {user?.role == "PM" ? (
            <div
              className="flex ml-6"
              onClick={() => {
                setSelectedTask(row.original?.id);
                handleDeleteModal();
              }}
            >
              <XMarkIcon className="w-5  text-red-500 cursor-pointer" />
              <span className="ml-2 mb-2 cursor-pointer"> {t("Delete")} </span>
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28">
      {/* Add New Task Modal */}
      <CreateTaskModal isOpen={isRegisterOpen} onClose={handleModal} />
      {/* Add New Task Modal */}
      {/* Remove task modal */}
      {selectedTask && (
        <RemoveModal
          title="Delete task"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/projects/tasks/${selectedTask}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/projects/tasks")}
        />
      )}
      {/* Remove task modal */}

      {/* Edit task Modal */}
      {selectedTask && (
        <EditTaskModal
          isOpen={isEditOpen}
          onClose={handleEditModal}
          task={selectedTask}
        />
      )}
      {/* Edit task Modal */}

      <div className="ml-52 mb-2 flex ">
        <Button
          variant="primary"
          size="md"
          onClick={handleModal}
          style=" p-2 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <HiPlus className="mt-[2px] w-6 h-5" />
          Create new task
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={generatePDF}
          style=" p-2 ml-auto mr-16 flex rounded-sm text-primary border border-primary shadow-sm hover:bg-primary hover:text-white "
        >
          <AiOutlineDownload className="mt-[2px] w-6 h-5" />
          Download
        </Button>
      </div>
      {!loading && (
        <Table
          data={data?.tasks ?? []}
          columns={columns}
          title="Tasks"
          placeholder="Find by task name"
        />
      )}
    </div>
  );
}
