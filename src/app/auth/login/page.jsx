"use client";
import { signIn } from "@/backend/authAPI";
import MainInput from "@/components/input";
import { displaySuccessMessage } from "@/helper/toastAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
      displaySuccessMessage("Logged in successfull");
      router.push("/dashboard");
    } catch (error) {
      throw new Error("Kunde inte logga in");
    }
  };
  return (
    <div className="flex  flex-col justify-center items-center h-screen bg-gray-50">
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
              className="bg-green-200 w-full p-2 hover:bg-green-300">
              Login
            </button>
            <Link href={"/auth/signUp"}>
              <span className="text-sm text-blue-600 pt-4">Inget konto? </span>
              Skapa konto
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
