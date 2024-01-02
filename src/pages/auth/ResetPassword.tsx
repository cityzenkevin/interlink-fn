import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Input from "../../components/Input";

import logo from "../../assets/logo.png";
import { createApiData } from "../../redux/features";
import { fields } from "../../types";
import { resetPasswordField } from "../../constants/formFields";

const fieldState: fields = {};

resetPasswordField.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function ResetPassord() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [resetPasswordState, setResetPasswordState] = useState(fieldState);
  const { error, loading } = useAppSelector((state) => state.api);

  const searchParams = new URLSearchParams(document.location.search);
  const token = searchParams.get("token");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resetPasswordState.password !== resetPasswordState.confirmPassword)
      return toast.error(t("Password does not match"));
    try {
      await dispatch(
        createApiData({
          body: { password: resetPasswordState.password, token },
          url: "/auth/reset-password",
        })
      ).unwrap();

      toast.success(t("Password reset successfully"));
      setResetPasswordState(fieldState);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(t(error.message));
      } else {
        console.log("Unknown error:", error);
        toast.error(t("An unknown error occurred"));
      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-full   h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md mb-10 w-full space-y-4 border p-6 rounded shadow-md">
        <div className="flex flex-col justify-center items-center ">
          <h4 className="text-lg font-bold text-primary">
            Safe Haven
          </h4>
          <div className="mx-auto flex  items-center justify-center  shadow-sm">
            <img src={logo} alt="" className="w-24" />
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
        <form className=" space-y-6" onSubmit={onSubmit}>
          <div className="">
            {resetPasswordField.map((field) => (
              <Input
                key={field.id}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={t(field.placeholder)}
                customClass=" px-2 py-1"
                defaultValue={
                  resetPasswordState[
                    field.id as keyof typeof resetPasswordState
                  ]
                }
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setResetPasswordState({
                    ...resetPasswordState,
                    [e.target.id]: e.target.value,
                  });
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm 
            font-medium rounded-md
            ${
              !loading
                ? "text-white bg-primary hover:bg-primaryHover focus:ring-primary"
                : "bg-gray-300 text-gray-500 border-gray-400 focus:ring-gray-200  hover:bg-gray-400 hover:text-white"
            }
             
              focus:outline-none focus:ring-2 focus:ring-offset-2
               `}
          >
            {loading ? "Loading..." : t("Send Password Reset Link")}
          </button>
        </form>
      </div>
    </div>
  );
}
