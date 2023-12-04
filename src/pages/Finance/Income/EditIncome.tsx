import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { budgetFields } from "../../../constants/budget";
import Combo from "../../../components/Combo";
import { fetchApiData, updateApiData } from "../../../redux/features";
import { incomeFields } from "../../../constants/finance";
import List from "../../../components/List";

const incomeCategories = [
  "Grants",
  "Fundraising Events",
  "Membership Fees",
  "Sponsorships",
  "Investment Income",
  "Sale of Goods or Services",
  "Interest and Dividends",
  "Other Income",
];

interface IEditProps extends IProps {
  income: any;
}

const fieldState: fields = {};

budgetFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const EditIncomeModal = ({ isOpen, onClose, income }: IEditProps) => {
  const [selectedIncome, setSelectedIncome] = useState<any>(income);
  const [source, setSource] = useState(income.source ? income.source : "");
  const [donor, setDonor] = useState<any>("");

  const data = useAppSelector((state) => state.api);
  const dispatch = useAppDispatch();

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateApiData({
          body: {
            description: selectedIncome.description,
            amount: selectedIncome.amount,
            source: selectedIncome.source,
            income_date: selectedIncome.income_date,
          },
          url: `/finance/incomes/${income.id}`,
        })
      ).unwrap();
      toast.success("Income updated successfully");
      onClose();
      setSelectedIncome(fieldState);
      dispatch(fetchApiData("/finance/incomes"));
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
    setSelectedIncome(income);
  }, [income]);

  console.log(income);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditSubmit}
      title="Edit expense"
      styles="max-w-xl"
    >
      <div className="mt-2">
        <hr className="mt-2" />
        <div className="mt-2 m-2">
          <form method="POST" onSubmit={handleEditSubmit}>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
              <List
                selectedItem={source}
                items={incomeCategories}
                onChange={setSource}
                label="Source of income"
              />
              <div className=" ">
                {source && source === "Donations" && (
                  <Combo
                    styles="top-16 top"
                    selected={donor}
                    options={data?.donor ?? []}
                    setSelected={setDonor}
                    title="Donor "
                    valueKey="id"
                    displayKey="donorName"
                    isMultiple={false}
                  />
                )}
              </div>
              {incomeFields.map((field) => (
                <Input
                  key={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  labelFor={field.labelFor}
                  labelText={field.labelText}
                  handleChange={(e) =>
                    setSelectedIncome({
                      ...selectedIncome,
                      [field.id]: e.target.value,
                    })
                  }
                  isRequired={false}
                  id={field.id}
                  defaultValue={
                    income
                      ? selectedIncome[field.id as keyof typeof fieldState]
                      : ""
                  }
                  name={field.name}
                  customClass=""
                />
              ))}

              <div className=" md:col-span-2 flex flex-col">
                <label htmlFor="description" className="font-semibold mb-2">
                  Description
                </label>
                <textarea
                  className="border shadow-sm rounded-md p-2 border-gray-300  focus:ring-1 focus:ring-primary focus:border-primary focus:z-10"
                  name="description"
                  id="description"
                  cols={20}
                  rows={3}
                  onChange={(e) =>
                    setSelectedIncome({
                      ...selectedIncome,
                      description: e.target.value,
                    })
                  }
                  defaultValue={income ? selectedIncome.description : ""}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditIncomeModal;
