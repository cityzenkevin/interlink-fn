import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import { taskFields } from "../../../constants/project";
import Input from "../../../components/Input";
import List from "../../../components/List";
import Combo from "../../../components/Combo";
import { fetchApiData, updateApiData } from "../../../redux/features";

const fieldState: fields = {};
taskFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const priorities = ["Low", "Medium", "High"];
const statuses = ["Completed", "Ongoing", "Blocked"];

const EditTaskModal = ({
  isOpen,
  onClose,
  task,
}: IProps & {
  task: any;
}) => {
  const dispatch = useAppDispatch();

  const [selectedTask, setSelectedTask] = useState<any>(task);
  const [priority, setPriority] = useState<string>(selectedTask.priority);
  const [status, setStatus] = useState<string>(selectedTask.status);

  const [teamMember, setTeamMember] = useState<any>(
    selectedTask?.project?.teamMembers.find(
      (member: any) => member.id === selectedTask?.assigned_to
    )
  );

  const handleFormChange = (e: any) => {
    setSelectedTask({
      ...selectedTask,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!priority) return toast.error("Please select a priority");
    if (!teamMember) return toast.error("Please select a team member");

    const formData = {
      description: selectedTask.description,
      due_date: selectedTask.due_date,
      task_name: selectedTask.task_name,
      priority,
      employee_id: teamMember.id,
      status,
    };

    try {
      await dispatch(
        updateApiData({
          body: formData,
          url: `/projects/tasks/${selectedTask.id}`,
        })
      ).unwrap();

      toast.success("Task updated successfully");
      onClose();
      setSelectedTask(fieldState);
      setTeamMember("");
      setPriority("");

      dispatch(fetchApiData(`/projects/tasks`));
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchApiData("/employees"));
    dispatch(fetchApiData("/projects"));
  }, []);
  useEffect(() => {
    setSelectedTask(task);
    setPriority(task.priority);
    setTeamMember(
      task?.project?.teamMembers.find(
        (member: any) => member.id === task?.assigned_to
      )
    );
  }, [task]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Update  task"
      styles="max-w-xl"
    >
      <form method="POST" className="mt-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {taskFields.map((field) => (
            <Input
              key={field.id}
              type={field.type}
              placeholder={field.placeholder}
              labelFor={field.labelFor}
              labelText={field.labelText}
              handleChange={handleFormChange}
              isRequired={field.isRequired}
              id={field.id}
              defaultValue={selectedTask[field.id as keyof typeof fieldState]}
              name={field.name}
              customClass=""
            />
          ))}

          <div className="">
            {selectedTask?.project?.teamMembers && (
              <Combo
                styles="top-72 md:top-36"
                selected={teamMember}
                options={selectedTask?.project?.teamMembers ?? []}
                setSelected={setTeamMember}
                title="Assign to"
                valueKey="id"
                displayKey="user?.firstname"
                isMultiple={false}
                isRequired={true}
              />
            )}
          </div>
          <div className="mt-32 md:mt-16">
            <List
              selectedItem={priority}
              items={priorities}
              onChange={setPriority}
              label="Priority"
            />
          </div>
          <div className=" md:-mt-20">
            <List
              selectedItem={status}
              items={statuses}
              onChange={setStatus}
              label="Status"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="description" className="font-semibold mb-2">
              Description
            </label>
            <textarea
              className="border shadow-sm rounded-md p-2 border-gray-300  focus:ring-1 focus:ring-primary focus:border-primary focus:z-10"
              name="description"
              id="description"
              cols={20}
              rows={3}
              defaultValue={selectedTask.description}
              onChange={handleFormChange}
            ></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
