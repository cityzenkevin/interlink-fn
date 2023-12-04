import { useEffect, useContext, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hook";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginFields } from "../constants/formFields";
import Input from "../components/Input";
import { loginUser } from "../api/auth.api";
import { UserContext } from "../hooks/useAuth";

import logo from "../assets/logo.png";
import { Login as LoginI } from "../types";

type fields = {
  [key: string]: string | number;
};
const fieldState: fields = {};

loginFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [loginState, setLoginState] = useState(fieldState);
  const { error, user } = useAppSelector((state) => state.login);

  useEffect(() => {
    if (user) {
      login({ user: { ...user } });
      navigate("/dashboard/");
    }
  }, [user]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myFields: LoginI = {
      email: loginState.email as string,
      password: loginState.password as string,
    };

    dispatch(loginUser(myFields));
  };

  return (
    <div className="bg-gray-200 min-h-full   h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md mb-10 w-full space-y-4 border p-6 rounded shadow-md">
        <div className="flex flex-col justify-center items-center ">
          <div className="mx-auto border-2 border-primary flex  items-center justify-center  shadow-sm">
            <img src={logo} alt="" className="w-44" />
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
            {loginFields.map((field) => (
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
                defaultValue={loginState[field.id as keyof typeof loginState]}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginState({
                    ...loginState,
                    [e.target.id]: e.target.value,
                  });
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between ">
            <div className="text-sm">
              <a
                href="/password/reset"
                className="font-medium text-primary hover:primaryHover"
              >
                {t("Forgot your password?")}
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "
          >
            {t("Login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
