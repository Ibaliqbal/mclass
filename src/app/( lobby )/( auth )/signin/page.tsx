import FormSignIn from "@/components/form/form-signin";
import LayoutAuth from "@/layouts/auth/layout-auth";

const page = () => {
  return (
    <LayoutAuth
      role="student"
      type="register"
      textMore="Don`t hava an account ? Sign up"
    >
      <div className="flex flex-col gap-4">
        <h1 className="md:text-2xl text-xl font-semibold text-center max-w-xl">
          🎉 Selamat Datang Kembali,{" "}
          <span className="bg-green-300 dark:bg-gradient-to-br from-emerald-300 to-green-500 px-2 py-1 text-2xl md:text-3xl">
            Para Pahlawan Masa Depan!
          </span>{" "}
          🎓 Ayo Masuk dan Siapkan Diri untuk Petualangan Hebat Bersama Kami!
        </h1>
        <FormSignIn />
      </div>
    </LayoutAuth>
  );
};

export default page;
