import FormRegis from "@/components/form/teacher/form-regis";
import LayoutAuth from "@/layouts/auth/layout-auth";
import React from "react";

const page = () => {
  return (
    <LayoutAuth
      type="signin"
      role="teacher"
      textMore="Hava an account ? Sign in"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center max-w-xl">
          🌟 Welcome{" "}
          <span className="bg-green-300 dark:bg-gradient-to-br from-emerald-300 to-green-500 px-2 py-1 text-3xl">
            Future Educators!
          </span>{" "}
          , 📚 Register Now to Inspire the Next Generation!
        </h1>
        <FormRegis />
      </div>
    </LayoutAuth>
  );
};

export default page;
