import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { fields } from "../../types";
import { projectFields } from "../../constants/project";
import Input from "../../components/Input";
import List from "../../components/List";
import { fetchApiData, updateApiData } from "../../redux/features";
import Combo from "../../components/Combo";
import Button from "../../components/Button";
import { AiFillEdit } from "react-icons/ai";

const fieldState: fields = {};
projectFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const projectTypes = [
  "Education Initiatives",
  "Healthcare Programs",
  "Women's Empowerment",
  "Environmental Conservation",
  "Rural Development",
  "Child Welfare",
  "Disaster Relief",
  "Human Rights Advocacy",
  "Poverty Alleviation",
  "HIV/AIDS Awareness",
  "Community Development",
  "Cultural Preservation",
  "Advocacy and Lobbying",
  "Peace and Conflict Resolution",
  "Refugee and Migration Support",
  "Technology for Development",
  "Youth Engagement",
  "Elderly Care",
];

const EditProject = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const project = data?.projects?.find((project: any) => project.id === id);

  const navigate = useNavigate();

  const [createFieldState, setCreateFieldState] = useState<fields>(project);

  const [type, setType] = useState(project?.type);
  const [status, setStatus] = useState(project?.status);
  const [manager, setManager] = useState<string>(project?.manager ?? "");

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const m: any = manager;

    if (createFieldState.start_date == "") {
      delete createFieldState.start_date;
    }
    if (createFieldState.end_date == "") {
      delete createFieldState.end_date;
    }

    const formData = {
      ...createFieldState,
      type,
      status,
      manager_id: m?.id,
    };

    try {
      await dispatch(
        updateApiData({
          body: formData,
          url: `/projects/${project.id}`,
        })
      ).unwrap();

      toast.success("Project Edited successfully");
      setCreateFieldState(fieldState);
      dispatch(fetchApiData("/projects"));
      navigate("/dashboard/project");
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
    dispatch(fetchApiData("/skills"));
    dispatch(fetchApiData("/employees"));
    dispatch(fetchApiData("/projects"));
  }, []);

  useEffect(() => {
    if (data?.projects) {
      setCreateFieldState(project);
    }
  }, [project]);
  return (
    <div className="mt-16 m-2 md:mr-40">
      <div className="lg:ml-52">
        <h3 className="font-medium text-lg mb-4">Add Project</h3>
      </div>
      <div className="bg-white border  shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className=" ">
              {!loading && (
                <Combo
                  styles="top-36 top"
                  selected={manager}
                  options={data?.employees ?? []}
                  setSelected={setManager}
                  title="Project Manager"
                  valueKey="id"
                  displayKey="user?.firstname"
                  isMultiple={false}
                />
              )}
            </div>
            <div className="mt-28 md:mt-0">
              <List
                selectedItem={type}
                items={projectTypes}
                onChange={setType}
                label="Project type"
              />
            </div>
            <div className="mt-28 md:mt-0">
              <List
                selectedItem={status}
                items={["Active", "Completed"]}
                onChange={setStatus}
                label="Status"
              />
            </div>
            {projectFields.map((field) => (
              <Input
                key={field.id}
                type={field.type}
                placeholder={field.placeholder}
                labelFor={field.labelFor}
                labelText={field.labelText}
                handleChange={handleFormChange}
                isRequired={false}
                id={field.id}
                defaultValue={
                  project
                    ? createFieldState[field.id as keyof typeof fieldState]
                    : ""
                }
                name={field.name}
                customClass=""
              />
            ))}
            <div className=" md:col-span-3 flex flex-col">
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
                defaultValue={project ? createFieldState.description : ""}
              ></textarea>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            type="submit"
            style={`p-2 mt-3 ml-auto flex rounded-sm border text-primary border-primary hover:bg-primary hover:text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            <AiFillEdit className="mt-[2px] w-6 h-5" />
            Edit Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
