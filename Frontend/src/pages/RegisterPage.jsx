import React from "react";
import LeftPanel from "../components/loginpage/LeftPanel";
import RegisterForm from "../components/registerPage/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[900px] h-[550px] rounded-3xl overflow-hidden shadow-2xl flex">
        <LeftPanel />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;