import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import { IProps, fields } from "../../../types";
import { toast } from "react-toastify";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import List from "../../../components/List";
import { createApiData, fetchApiData } from "../../../redux/features";
import Combo from "../../../components/Combo";
import { incomeFields } from "../../../constants/finance";

const fieldState: fields = {};
incomeFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const incomeCategories = [
  "Donations",
  "Grants",
  "Fundraising Events",
  "Membership Fees",
  "Sponsorships",
  "Investment Income",
  "Sale of Goods or Services",
  "Interest and Dividends",
  "Other Income",
];

const AddIncome = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const data = useAppSelector((state) => state.api);

  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);
  const [source, setSource] = useState("");
  const [donor, setDonor] = useState<any>("");

  const handleFormChange = (e: any) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!source) return toast.error("Please select income source");
    let formData = {
      ...createFieldState,
      source,
      donor_id: donor?.id,
    };
    if (source === "Donations" && !donor) {
      return toast.error("Please select donor");
    }

    if(source !== "Donations") delete formData.donor_id;
    try {
      await dispatch(
        createApiData({
          body:formData,
          url: "/finance/incomes",
        })
      ).unwrap();

      toast.success("income addded successfully");
      onClose();
      setCreateFieldState(fieldState);
      setSource("");
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
    dispatch(fetchApiData("/users/donor"));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add new income"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
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
              handleChange={handleFormChange}
              isRequired={field.isRequired}
              id={field.id}
              defaultValue={fieldState[field.id as keyof typeof fieldState]}
              name={field.name}
              customClass=""
            />
          ))}

          <div className=" md:col-span-2 flex flex-col">
            <label htmlFor="description" className="font-semibold mb-2">
              {t("Description")}
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

export default AddIncome;
