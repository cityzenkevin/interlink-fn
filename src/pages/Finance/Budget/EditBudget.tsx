import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { budgetFields } from "../../../constants/budget";
import Combo from "../../../components/Combo";
import { fetchApiData, updateApiData } from "../../../redux/features";

interface IEditProps extends IProps {
  budget: any;
}

const fieldState: fields = {};

budgetFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const EditBudgetModal = ({ isOpen, onClose, budget }: IEditProps) => {
  const [selectedBudget, setSelectedBudget] = useState<any>(budget);

  const [project, setProject] = useState(budget.project_id);

  const data = useAppSelector((state) => state.api);
  const dispatch = useAppDispatch();

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateApiData({
          body: {
            budget_name: selectedBudget.budget_name,
            amount: selectedBudget.amount,
          },
          url: `/finance/budgets/${budget.id}`,
        })
      ).unwrap();
      toast.success("Budget updated successfully");
      onClose();
      setSelectedBudget(fieldState);
      dispatch(fetchApiData("/finance/budgets"));
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
  
  useEffect(() => {
    setSelectedBudget(budget);
  }, [budget]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditSubmit}
      title="Edit budget"
      styles="max-w-xl"
    >
      <div className="mt-2">
        <hr className="mt-2" />
        <div className="mt-2 m-2">
          <form method="POST" onSubmit={handleEditSubmit}>
            <div className="mb-[76px]">
              {
                <Combo
                  styles=" "
                  selected={project}
                  options={data?.projects ?? []}
                  setSelected={setProject}
                  title="Project"
                  valueKey="id"
                  displayKey="project_name"
                  isMultiple={false}
                />
              }
            </div>
            {budgetFields.map((field) => (
              <Input
                key={field.id}
                type={field.type}
                placeholder={field.placeholder}
                labelFor={field.labelFor}
                labelText={field.labelText}
                handleChange={(e) => {
                  setSelectedBudget({
                    ...selectedBudget,
                    [field.id]: e.target.value,
                  });
                }}
                isRequired={field.isRequired}
                id={field.id}
                defaultValue={
                  selectedBudget[field.id as keyof typeof fieldState]
                }
                name={field.name}
              />
            ))}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditBudgetModal;
