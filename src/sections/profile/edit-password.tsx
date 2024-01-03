import { toast } from "react-toastify";

import Input from "../../components/Input";
import { passwordFields } from "../../constants/formFields";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { updateApiData } from "../../redux/features";
import { fields } from "../../types";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const fieldState: fields = {};
passwordFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export function EditPassword({ user }: { user: any }) {
  const { loading } = useAppSelector((state) => state.api);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [passwordFieldState, setPasswordField] = useState<fields>(fieldState);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(
        updateApiData({
          body: {
            oldPassword: passwordFieldState.currentPassword,
            newPassword: passwordFieldState.newPassword,
            userId: user.id,
          },
          url: "/auth/change-password",
        })
      ).unwrap();
      setPasswordField(fieldState);
      toast.success("Password changed successfully");
      history.go(0);
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
    <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen lg:px-8">
      <div className="flex flex-wrap ">
        <div className="">
          <ul
            className="flex mb-0 list-none flex-wrap pb-4 flex-row text-black dark:text-dark-text-fill"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <span className="uppercase font-extrabold text-primary text-lg rounded block leading-normal  ">
                {t("Change Password")}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[80%] h-[56vh] md:h-[60vh] lg:h-[60vh] mx-4 mb-6 lg:-ml-8 rounded-lg">
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
              />
            ))}

            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
              ${
                loading
                  ? "bg-gray-300 text-gray-500 border-gray-400 focus:ring-gray-200  hover:bg-gray-400 hover:text-white"
                  : "bg-primary text-white border-primary focus:ring-primary  hover:bg-primaryHover hover:text-white "
              }
  
             focus:outline-none focus:ring-2 focus:ring-offset-2  `}
            >
              {loading ? "Loading..." : t("Change Password")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
