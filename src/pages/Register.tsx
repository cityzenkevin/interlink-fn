import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import { registerFields } from "../constants/formFields";
// import { login } from "../../redux/actions/auth.action";
import Input from "../components/Input";
// import Alert from "../components/Alert";

type fields = {
  [key: string]: string | number;
};
const fieldState: fields = {};

registerFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Register() {
  const [registerState, setRegisterState] = useState(fieldState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { error, isAuth } = useSelector((state) => state.login);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (isAuth) return navigate("../dashboard");
  //   }, 300);
  // }, [isAuth]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const { email, password } = registerState;
    // return dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-full  h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="bg-white max-w-md w-full space-y-4 border p-3 rounded shadow-sm">
      <div className="mx-auto flex  items-center justify-center  ">
        <img src={logo} alt="" className="w-16" />
      </div>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex items-center justify-between mb-4 mt-2d">
            <div className="text-sm">
              <span className="font-medium"> Have an account? </span>
              <a
                href="/login"
                className="font-medium text-primary ml-2 hover:primaryHover"
              >
                Login
              </a>
            </div>
          </div>
        </div>
        <form className=" space-y-6" onSubmit={handleSubmit}>
          <div className="">
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
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
