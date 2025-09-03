"use client";
import { signIn } from "@/backend/authAPI";
import MainInput from "@/components/input";
import { displaySuccessMessage } from "@/helper/toastAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const userInfo = {
        username: user.username,
        password: user.password,
      };
      await signIn(userInfo);
      displaySuccessMessage("Inloggning lyckades");
      router.push("/dashboard");
    } catch (error) {
      throw new Error("Kunde inte logga in");
    }
  };
  return (
    <div className="flex  flex-col justify-center items-center h-screen bg-gray-50">
      <HiOutlineLockClosed size={40} />
      <h3 className="mb-5 text-2xl">Vänligen logga in</h3>

      <div className="flex flex-col p-8 shadow-lg shadow-blue-200 bg-white w-full min-h-fit max-w-md ">
        <form onSubmit={loginHandler}>
          <MainInput
            className={"p-1 w-full border border-black rounded-lg"}
            type={"text"}
            name={"username"}
            placeholder={"Användarnamn"}
            label={"Användarnamn"}
            changeHandler={changeHandler}
          />

          <MainInput
            className={"p-1 w-full border border-black rounded-lg"}
            type={"password"}
            name={"password"}
            placeholder={"Lösenord"}
            label={"Lösenord"}
            changeHandler={changeHandler}
          />

          <div className="">
            <button
              type="submit"
              className="p-2 w-1/3 bg-indigo-100 text-indigo-800 font-medium 
             border border-indigo-200 rounded-md shadow-sm 
             hover:bg-indigo-200 transition">
              Logga in
            </button>
            <Link href={"/auth/signUp"}>
              <span className="text-sm text-blue-600 pt-4">
                Inget konto? Skapa konto
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
