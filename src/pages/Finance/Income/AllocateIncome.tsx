import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import List from "../../../components/List";
import { createApiData, fetchApiData } from "../../../redux/features";
import Combo from "../../../components/Combo";
import Button from "../../../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { formatDateInWords } from "../../../utils";

const AllocateIncome = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");

  const [project, setProject] = useState<any>("");
  const [income, setIncome] = useState<any>("");

  const handleFormChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const m: any = project;
    data?.incomes.filter((c: any) => {
      console.log(income.split("-")[1]);
      return (
        c?.description?.slice(0, 10)  === income.split(" - ")[1].trim() &&
        c?.source === income.split("-")[0].trim()
      );
    })[0].id;

    const income_id = data?.incomes.filter(
      (c: any) =>
        c?.description?.slice(0, 10) === income.split(" - ")[1].trim() &&
        c?.source === income.split("-")[0].trim()
    )[0].id;

    const formData: {
      amount: number;
      project_id: string;
    } = {
      amount: parseInt(amount),
      project_id: m.id,
    };

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: `/finance/incomes/${income_id}/allocate`,
        })
      ).unwrap();

      toast.success("New income created successfully");
      setAmount("");
      dispatch(fetchApiData("/finance/incomes"));
      navigate("/dashboard/income");
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
    dispatch(fetchApiData("/finance/incomes"));
  }, []);

  return (
    <div className="mt-16 m-2 md:mr-40">
      <div className="lg:ml-52">
        <h3 className="font-medium text-lg mb-4">Allocate income</h3>
      </div>
      <div className="bg-white border  shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="z-20">
              {!loading && (
                <List
                  selectedItem={income}
                  items={
                    data?.incomes?.map(
                      (b: any) =>
                        `${b?.source} - ${b?.description?.slice(0, 10)}`
                    ) ?? []
                  }
                  onChange={setIncome}
                  label="Income"
                />
              )}
            </div>
            <div className={`${income ? "flex flex-col mt-1" : "hidden"}  `}>
              <label className="font-semibold">Available Income Amount</label>
              <span className="mt-1">
                {income &&
                  data?.incomes?.filter(
                    (b: any) =>
                      formatDateInWords(b?.income_date) ===
                        income.split(" - ").pop("") &&
                      b?.source === income.split(" - ")[0]
                  )[0]?.amount}
              </span>
            </div>
            <div className="z-10">
              {!loading && (
                <Combo
                  styles="top-56 z-10 md:top-36 top"
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
              Allocate Income
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllocateIncome;
