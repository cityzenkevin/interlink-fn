import List from "../../components/List";
import { qualificationFields } from "../../constants/employee";
import Input from "../../components/Input";

const educationDegrees = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (Ph.D.)",
  "Professional Certification",
  "Vocational Training",
  "Online Courses",
];

interface Iprops{
    fieldState: any;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    degree: string,
    setDegree: React.Dispatch<React.SetStateAction<string>>
}

export default function EmployeeQualification(
    {
        fieldState,
        handleFormChange,
        degree,
        setDegree
    }: Iprops
) {
  return (
    <div>
      <h3 className="font-bold text-center text-xl mb-6">Qualifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <List
          items={educationDegrees}
          selectedItem={degree}
          onChange={setDegree}
          label="Education Degree"
        />
        {qualificationFields.map((field) => (
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
    </div>
  );
}

