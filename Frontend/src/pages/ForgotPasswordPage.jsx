import React from "react";
import LeftPanel from "@/components/loginpage/LeftPanel";
import ForgotPasswordForm from "@/components/forgotpassword/ForgotPasswordForm";


const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[900px] h-[550px] rounded-3xl overflow-hidden shadow-2xl flex">
        <LeftPanel />
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;