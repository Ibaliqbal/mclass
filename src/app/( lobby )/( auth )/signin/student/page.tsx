import FormSignIn from "@/components/form/student/form-signin";
import LayoutAuth from "@/layouts/auth/layout-auth";
import React from "react";

const page = () => {
  return (
    <LayoutAuth
      role="student"
      type="register"
      textMore="Don`t hava an account ? Sign up"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center max-w-xl">
          🎉 Welcome Back,{" "}
          <span className="bg-green-300 dark:bg-gradient-to-br from-emerald-300 to-green-500 px-2 py-1 text-3xl">
            Future Leaders!
          </span>{" "}
          🎓 Sign In to Continue Your Journey!
        </h1>
        <FormSignIn />
      </div>
    </LayoutAuth>
  );
};

export default page;
