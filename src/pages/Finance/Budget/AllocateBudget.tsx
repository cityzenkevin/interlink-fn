import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import List from "../../../components/List";
import { createApiData, fetchApiData } from "../../../redux/features";
import Combo from "../../../components/Combo";
import Button from "../../../components/Button";
import { AiOutlinePlus } from "react-icons/ai";

const AllocateBudget = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");

  const [project, setProject] = useState<any>("");
  const [budget, setBudget] = useState<any>("");
  const [task, setTask] = useState<any>("");

  const handleFormChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const m: any = project;
    const budget_id = data?.budgets.filter(
      (b: any) => b?.budget_name === budget
    )[0].id;

    const formData: {
      amount: number;
      project_id: string;
      task_id?: string;
    } = {
      amount: parseInt(amount),
      project_id: m.id,
    };

    if (task !== "") {
      formData.task_id = task.id;
    }
    try {
      await dispatch(
        createApiData({
          body: formData,
          url: `/finance/budgets/${budget_id}/allocate`,
        })
      ).unwrap();

      toast.success("Budget allocated successfully");
      setAmount("");
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
    dispatch(fetchApiData("/finance/budgets"));
  }, []);

  return (
    <div className="mt-16 m-2 md:mr-40">
      <div className="lg:ml-52">
        <h3 className="font-medium text-lg mb-4">Allocate budget</h3>
      </div>
      <div className="bg-white border  shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className=" ">
              {!loading && (
                <List
                  selectedItem={budget}
                  items={data?.budgets?.map((b: any) => b?.budget_name) ?? []}
                  onChange={setBudget}
                  label="Budget"
                />
              )}
            </div>
            <div className={`${budget ? "flex flex-col mt-1" : "hidden"}  `}>
              <label className="font-semibold">Available Budget Amount</label>
              <span className="mt-1">
                {budget &&
                  data?.budgets.filter((b: any) => b?.budget_name === budget)[0]
                    .amount}
              </span>
            </div>
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
            <div className="top-52">
              {project?.tasks && project?.tasks.length > 0 && (
                <Combo
                  styles="top-[14rem] top"
                  selected={task}
                  options={project.tasks ?? []}
                  setSelected={setTask}
                  title="Task"
                  valueKey="id"
                  displayKey="task_name"
                  isMultiple={false}
                />
              )}
              {project?.tasks && project?.tasks.length == 0 && (
                <div className="mt-1 flex flex-col">
                  <label className="font-semibold">Task</label>
                  <span className="mt-1 text-red-500 font-semibold">
                    No tasks in this project
                  </span>
                </div>
              )}
            </div>
            <div
              className={`
             ${project ? "flex flex-col mt-1" : "hidden"}    
            `}
            >
              <label>
                <span className="font-semibold">Amount</span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                onChange={handleFormChange}
                value={amount}
              />
            </div>
          </div>
          <br />
          <div>
            <Button
              variant="primary"
              size="md"
              type="submit"
              style={`p-2 mt-16 ml-auto flex rounded-sm border text-primary border-primary hover:bg-primary hover:text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              <AiOutlinePlus className="mt-[2px] w-6 h-5" />
              Allocate Budget
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllocateBudget;
