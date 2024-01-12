import { useEffect, useContext, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerFields } from "../../constants/formFields";
import Input from "../../components/Input";
import { UserContext } from "../../hooks/useAuth";

import { toast } from "react-toastify";
import { createApiData } from "../../redux/features";

type fields = {
  [key: string]: string | number;
};
const fieldState: fields = {};

registerFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const [registerState, setRegisterState] = useState(fieldState);
  const { error, user } = useAppSelector((state) => state.login);

  const { loading } = useAppSelector((state) => state.api);

  useEffect(() => {
    if (user?.id) {
      login({ user: { ...user } });
      navigate("/dashboard/");
    }
  }, [user]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (registerState?.password !== registerState?.confirmPassword) {
        return toast.error("Password does not match");
      }

      const myFields = {
        username: registerState.username as string,
        password: registerState.password as string,
        email: registerState.email as string,
        firstName: registerState.firstName as string,
        lastName: registerState.lastName as string,
      };

      await dispatch(
        createApiData({
          body: myFields,
          url: "/auth/register",
        })
      ).unwrap();
      setRegisterState(fieldState);
      toast.success("Registration successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error: any) {
      if (error.message) {
        if (error.message === "Validation failed") {
          console.log("validation error", error?.data?.data[0]);
          return toast.error(
            `${error?.data?.data[0]?.path} : ${error?.data?.data[0]?.message}`
          );
        }
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-full -pb-32  h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-xl mt-16 mb-12 w-full space-y-4 border p-6 rounded shadow-md">
        <div className="flex flex-col justify-center items-center ">
          <div>
            <h1 className="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-2 text-center">
              Register for Internship
            </h1>
          </div>
          <div>
            <div className="flex my-2 items-center justify-between ">
              <div>Have an account?</div>
              <div className="text-sm ml-2">
                <Link
                  to="/login"
                  className="font-medium text-primary hover:primaryHover"
                >
                  {t("Login")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2 ${
            error ? "flex" : "hidden"
          }`}
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
        <form className=" space-y-6 " onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {registerFields.map((field) => (
              <Input
                key={field.id}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
                customClass="dark:bg-dark-bg"
                defaultValue={
                  registerState[field.id as keyof typeof registerState]
                }
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRegisterState({
                    ...registerState,
                    [e.target.id]: e.target.value,
                  });
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between ">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-primary hover:primaryHover"
              >
                {t("Go to Home")}
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              t("Register")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
