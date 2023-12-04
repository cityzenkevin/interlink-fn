import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { userFields } from "../../constants/formFields";
import Input from "../../components/Input";
import List from "../../components/List";
import Combo from "../../components/Combo";
import { createApiData, fetchApiData } from "../../redux/features";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

interface Skill {
  id: string;
  name: string;
}

const addVolunteerModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  const skills = data?.skills ?? [];

  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [availability, setAvailability] = useState<string>("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSkillChange = (value: Skill[]) => {
    const skillExists = selectedSkills.find(
      (skill: Skill) =>
        skill.name === value[value.length - 1].name && skill.id == null
    );
    if (skillExists) {
      return;
    }
    setSelectedSkills(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      ...createFieldState,
      skills: selectedSkills,
      availability,
    };

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/volunteers",
        })
      ).unwrap();

      toast.success("Volunteer added successfully");
      onClose();
      setCreateFieldState(fieldState);
      dispatch(fetchApiData("/volunteers"));
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
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add New Volunteer"
      styles="max-w-xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
          <div className="">
            {!loading && (
              <Combo
                title="Skills"
                selected={selectedSkills}
                setSelected={handleSkillChange}
                options={skills}
                valueKey="id"
                displayKey="name"
                isMultiple={true}
                allowCustomValues={true}
              />
            )}
          </div>
          <List
            selectedItem={availability}
            items={["Full Time", "Part Time"]}
            onChange={setAvailability}
            label="Availability"
          />

          {userFields.map((field) => (
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
          <div
            className={`
           ${
             selectedSkills.length > 0
               ? "flex flex-col col-span-2 items-start"
               : "hidden"
           }
          `}
          >
            <h3 className="font-bold text-medium text-center">Skills</h3>
            <ul className="flex flex-wrap">
              {selectedSkills.map((skill: any) => (
                <li
                  key={Math.random()}
                  className="px-2 mt-1 mr-2 py-1 bg-sky-500 text-white rounded-md"
                >
                  {skill?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default addVolunteerModal;
