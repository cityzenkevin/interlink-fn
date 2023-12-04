import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { fields } from "../../types";
import Input from "../../components/Input";
import { createApiData, fetchApiData } from "../../redux/features";
import Button from "../../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { donorFields } from "../../constants/finance";

const fieldState: fields = {};
donorFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const AddDonor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [createFieldState, setCreateFieldState] = useState<fields>({
    ...fieldState,
  });

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
    if (formData.organization === "") delete formData.organization;

    try {
      await dispatch(
        createApiData({
          body: formData,
          url: "/users/donor",
        })
      ).unwrap();

      toast.success("Donor addded successfully");
      setCreateFieldState(fieldState);
      dispatch(fetchApiData("/users/donor"));
      navigate("/dashboard/donors");
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

  return (
    <div className="mt-16 m-2 md:mr-40">
      <div className="lg:ml-52">
        <h3 className="font-medium text-lg mb-4">Add Donor</h3>
      </div>
      <div className="bg-white border  shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {donorFields.map((field) => (
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
            style={`p-2 mt-5  flex rounded-sm border text-primary border-primary hover:bg-primary hover:text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            <AiOutlinePlus className="mt-[2px] w-6 h-5" />
            Add Donor
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddDonor;
