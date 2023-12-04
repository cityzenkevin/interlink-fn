import { useTranslation } from "react-i18next";

import Input from "../../components/Input";
import { experienceFields } from "../../constants/employee";
import List from "../../components/List";

const reasonsForLeaving = [
  "Better Opportunity",
  "Personal Reasons",
  "Company Downsizing",
  "Career Change",
  "Other",
];

interface IProps {
  fieldState: any;
  handleFormChange: (
    e: any
  ) => void;
  reasonForLeaving: string;
  setReasonForLeaving: React.Dispatch<React.SetStateAction<string>>;
}

const EmployeeExperience = ({
  fieldState,
  handleFormChange,
  reasonForLeaving,
  setReasonForLeaving,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="font-bold text-center text-xl mb-6">Experience</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <List
          items={reasonsForLeaving}
          selectedItem={reasonForLeaving}
          onChange={setReasonForLeaving}
          label="Reason for Leaving"
        />
        {experienceFields.map((field) => (
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
        <div className="col-span-3 flex flex-col">
          <label htmlFor="Responsabilities" className="font-semibold mb-2">
            {t("Responsibilities")}
          </label>
          <textarea
            className="border shadow-sm rounded-md p-2 border-gray-300  focus:ring-1 focus:ring-primary focus:border-primary focus:z-10"
            name="responsibilities"
            id="responsibilities"
            cols={20}
            rows={1}
            onChange={handleFormChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default EmployeeExperience;
