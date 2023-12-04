import { profileFields } from "../../constants/employee";
import Input from "../../components/Input";
import List from "../../components/List";

interface IProps {
  fieldState: any;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gender: string;
  setGender:  React.Dispatch<React.SetStateAction<string>>;
}
export default function EmployeeProfile({
  fieldState,
  handleFormChange,
  gender,
  setGender
}:IProps) {

  return (
    <div>
      <h3 className="font-bold text-center text-xl mb-6">Personal info</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {profileFields.map((field) => (
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

        <List
          items={["Male", "Female"]}
          selectedItem={gender}
          onChange={setGender}
          label="Gender"
        />
      </div>
    </div>
  );
}
