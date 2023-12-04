import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { passwordFields } from "../constants/formFields";
import { useAppDispatch } from "../redux/hook";
import Button from "../components/Button";
import Input from "../components/Input";
import { updateApiData } from "../redux/features";

type fields = {
  [key: string]: string | number;
};
const fieldState: fields = {};

passwordFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export function EditPassword() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordFieldState, setPasswordField] = useState<fields>(fieldState);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (passwordFieldState.newPassword !== passwordFieldState.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await dispatch(
        updateApiData({
          url: "/auth/reset-password",
          body: {
            oldPassword: passwordFieldState.currentPassword,
            newPassword: passwordFieldState.newPassword,
          },
        })
      ).unwrap();
      toast.success("Password changed successfully");
      setPasswordField(fieldState);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
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
    <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen lg:px-8">
      <div className="border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[75%] h-[56vh] md:h-[60vh] lg:h-[60vh] mx-4 mb-6 lg:-ml-8 rounded-lg">
        <div className="px-4">
          <form className="mt-12 grid grid-cols-1 gap-4" onSubmit={onSubmit}>
            {passwordFields.map((field) => (
              <Input
                key={field.id}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={t(`${field.placeholder}`)}
                customClass="dark:bg-dark-bg"
                defaultValue={fieldState.id}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordField({
                    ...passwordFieldState,
                    [field.id]: e.target.value,
                  });
                }}
                // register={register}
                // errors={errors}
              />
            ))}
            <Button
              variant="default"
              size="md"
              style="group relative md:w-2/3 sm:w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-[#1280a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary sm:mx-0"
              type="submit"
            >
              {t("Change Password")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
