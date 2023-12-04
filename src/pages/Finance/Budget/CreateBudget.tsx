import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { fields } from "../../../types";
import { budgetFields } from "../../../constants/budget";
import Input from "../../../components/Input";
import List from "../../../components/List";
import { createApiData, fetchApiData } from "../../../redux/features";
import Combo from "../../../components/Combo";
import Button from "../../../components/Button";
import { AiOutlinePlus } from "react-icons/ai";

const fieldState: fields = {};
budgetFields.forEach((field) => {
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

const CreateBudget = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const navigate = useNavigate();

  const [createFieldState, setCreateFieldState] = useState<fields>({
    ...fieldState,
  });

  const [type, setType] = useState("");
  const [project, setProject] = useState<any>("");

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      ...createFieldState,
    };
    if (type !== "") {
      formData.program = type;
    }

    if (project !== "") {
      formData.projectId = project.id;
    }

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/finance/budgets",
        })
      ).unwrap();

      toast.success("New budget created successfully");
      setCreateFieldState(fieldState);
      dispatch(fetchApiData("/finance/budgets"));
      navigate("/dashboard/budget");
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
    dispatch(fetchApiData("/projects"));
  }, []);

  return (
    <div className="mt-16 m-2 md:mr-40">
      <div className="lg:ml-52">
        <h3 className="font-medium text-lg mb-4">Create new budget</h3>
      </div>
      <div className="bg-white border  shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className=" ">
              {!loading && (
                <Combo
                  styles="top-36 top"
                  selected={project}
                  options={data?.projects ?? []}
                  setSelected={setProject}
                  title="Project"
                  valueKey="id"
                  displayKey="project_name"
                  isMultiple={false}
                />
              )}
            </div>
            <div className="mt-16 md:mt-0">
              {!project?.type ? (
                <List
                  selectedItem={type}
                  items={projectTypes}
                  onChange={setType}
                  label="Program"
                />
              ) : (
                <>
                  <div className="mb-5 ">
                    <label htmlFor="" className="font-semibold">
                      Program
                    </label>{" "}
                    <br />
                    <span className="bg-blue-500 mt-1 text-white px-2 py-1 rounded-md">
                      {project?.type}
                    </span>
                  </div>
                </>
              )}
            </div>
            {budgetFields.map((field) => (
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
          </div>
          <Button
            variant="primary"
            size="md"
            type="submit"
            style={`p-2 mt-3 ml-auto flex rounded-sm border text-primary border-primary hover:bg-primary hover:text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            <AiOutlinePlus className="mt-[2px] w-6 h-5" />
            Create Budget
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBudget;
