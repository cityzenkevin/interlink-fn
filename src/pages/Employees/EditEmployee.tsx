import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { editEmployeeFields } from "../../constants/employee";

import { fields } from "../../types";
import Input from "../../components/Input";
import { fetchApiData, updateApiData } from "../../redux/features";
import Button from "../../components/Button";
import { FiSend } from "react-icons/fi";

const EditEmployee = () => {
  const getValue = (field: string) => {
    if (
      field == "email" ||
      field == "telephone" ||
      field == "firstname" ||
      field == "lastname"
    ) {
      return employee.user[field as keyof typeof fieldState];
    }
    return employee[field as keyof typeof fieldState];
  };

  const fieldState: fields = {};

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const data = useAppSelector((state) => state.api);

  const employee = data?.employees?.find((employee: any) => employee.id === id);

  editEmployeeFields.forEach((field) => {
    fieldState[field.id as keyof typeof fieldState] = employee
      ? getValue(field.id)
      : "";
  });

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

    try {
      await dispatch(
        updateApiData({
          body: formData,
          url: `/users/${employee.user.id}`,
        })
      ).unwrap();

      toast.success("Employee updated successfully");
      setCreateFieldState(fieldState);
      dispatch(fetchApiData("/employees"));
      navigate("/dashboard/employees");
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
    dispatch(fetchApiData("/employees"));
  }, [dispatch]);

  useEffect(() => {
    if (data?.employees) {
      setCreateFieldState({
        ...fieldState,
      });
    }
  }, [employee]);

  return (
    <div className="mt-16 m-2 md:mr-40">
      <div className="lg:ml-52">
        <h3 className="font-medium text-lg mb-4">Edit Employee</h3>
      </div>
      <div className="bg-white border  shadow-md  px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-52 mb-10">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            {editEmployeeFields.map((field: any) => {
              return (
                <Input
                  key={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  labelFor={field.labelFor}
                  labelText={field.labelText}
                  handleChange={handleFormChange}
                  isRequired={field.isRequired}
                  id={field.id}
                  defaultValue={employee ? getValue(field.id) : ""}
                  name={field.name}
                  customClass=""
                />
              );
            })}
          </div>

          <Button
            variant="primary"
            size="md"
            type="submit"
            style={`p-2 mt-3 ml-auto flex rounded-sm border text-primary border-primary hover:bg-primary hover:text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            <FiSend className="mt-[2px] w-6 h-5" />
            Edit Employee
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
