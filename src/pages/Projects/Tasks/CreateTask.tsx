import { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import { taskFields } from "../../../constants/project";
import Input from "../../../components/Input";
import List from "../../../components/List";
import Combo from "../../../components/Combo";
import { createApiData, fetchApiData } from "../../../redux/features";
import { UserContext } from "../../../hooks/useAuth";

const fieldState: fields = {};
taskFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const priorities = ["Low", "Medium", "High"];

const CreateTaskModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { user } = useContext(UserContext);
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);
  const [priority, setPriority] = useState<string>("");
  const [teamMember, setTeamMember] = useState<any>("");
  const [project, setProject] = useState<any>("");

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!priority) return toast.error("Please select a priority");
    if (!teamMember) return toast.error("Please select a team member");
    if (!project) return toast.error("Please select a project");

    const formData = {
      ...createFieldState,
      priority,
      employee_id: teamMember.id,
    };

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: `/projects/${project?.id}/tasks`,
        })
      ).unwrap();

      toast.success("Task created successfully");
      onClose();
      setCreateFieldState(fieldState);
      setProject("");
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Create new task"
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
              defaultValue={fieldState[field.id as keyof typeof fieldState]}
              name={field.name}
              customClass=""
            />
          ))}
          <div className="">
            {!loading && (
              <Combo
                styles="top-52 md:top-36 "
                selected={project}
                options={
                  user?.role === "PM"
                    ? data?.projects
                    : data?.projects?.filter((p: any) => {
                        return p?.manager?.userId === user?.id;
                      }) ?? []
                }
                setSelected={setProject}
                title="Project"
                valueKey="id"
                displayKey="project_name"
                isMultiple={false}
                isRequired={true}
              />
            )}
          </div>
          <div className="">
            {project?.teamMembers && (
              <Combo
                styles="top-72 md:top-36"
                selected={teamMember}
                options={project?.teamMembers ?? []}
                setSelected={setTeamMember}
                title="Assign to"
                valueKey="id"
                displayKey="user?.firstname"
                isMultiple={false}
                isRequired={true}
              />
            )}
          </div>
          <div className="md:col-span-2 mt-32 md:mt-16">
            <List
              selectedItem={priority}
              items={priorities}
              onChange={setPriority}
              label="Priority"
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
              onChange={handleFormChange}
            ></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
