import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { fields } from "../../types";
import { projectFields } from "../../constants/project";
import Input from "../../components/Input";
import List from "../../components/List";
import { createApiData, fetchApiData } from "../../redux/features";
import Combo from "../../components/Combo";
import Button from "../../components/Button";
import { AiOutlinePlus } from "react-icons/ai";

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

const AddProject = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const navigate = useNavigate();

  const [createFieldState, setCreateFieldState] = useState<fields>({
    ...fieldState,
    description: "",
  });

  const [type, setType] = useState("");
  const [manager, setManager] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!manager) return toast.error("Please select a manager");
    if (!type) return toast.error("Please select a project type");
    const m: any = manager;

    const formData = {
      ...createFieldState,
      type,
      manager_id: m?.id,
      team_members: teamMembers.map((member) => member.id),
    };

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/projects",
        })
      ).unwrap();

      toast.success("Project created successfully");
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
  }, []);

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
            <div className="">
              {!loading && (
                <Combo
                  styles="top-52 md:top-36 top "
                  selected={teamMembers}
                  options={data?.employees ?? []}
                  setSelected={setTeamMembers}
                  title="Team Members"
                  valueKey="id"
                  displayKey="user?.firstname"
                  isMultiple={true}
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
            {projectFields.map((field) => (
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
              ></textarea>
            </div>
            <div
              className={`
           ${
             teamMembers.length > 0
               ? "flex flex-col col-span-2 items-start"
               : "hidden"
           }
          `}
            >
              <h3 className="font-bold text-medium text-center">
                Team Members
              </h3>
              <ul className="flex flex-wrap">
                {teamMembers.map((member: any) => (
                  <li
                    key={Math.random()}
                    className="px-2 mt-1 mr-2 py-1 bg-sky-500 text-white rounded-md"
                  >
                    {member?.user?.firstname}
                    {member?.user?.lastname}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            type="submit"
            style={`p-2 mt-3 ml-auto flex rounded-sm border text-primary border-primary hover:bg-primary hover:text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            <AiOutlinePlus className="mt-[2px] w-6 h-5" />
            Add Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
