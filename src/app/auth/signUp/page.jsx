"use client";

import { signIn, signUp } from "@/backend/authAPI";
import MainInput from "@/components/input";
import { displaySuccessMessage } from "@/helper/toastAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
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

  const SignUpHandler = async (e) => {
    e.preventDefault();
    try {
      const userInfo = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: user.password,
      };
      console.log("New användare", userInfo);
      await signUp(userInfo);
      displaySuccessMessage("Ny Användare registrerats");
      router.push("/dashboard/");
    } catch (error) {
      throw new Error("Kunde inte REGISTRERA NY ANVÄNDARE");
    }
  };
  return (
    <div className="flex  flex-col justify-center items-center h-screen bg-gray-50">
      <h3 className="mb-5 text-2xl">Skapa konto</h3>

      <div className="flex flex-col p-8 shadow-lg shadow-blue-200 bg-white w-full min-h-fit max-w-md ">
        <form onSubmit={SignUpHandler}>
          <MainInput
            className={"p-1 w-full border border-black rounded-lg"}
            type={"text"}
            name={"name"}
            placeholder={"Namn"}
            label={"Namn"}
            changeHandler={changeHandler}
          />{" "}
          <MainInput
            className={"p-1 w-full border border-black rounded-lg"}
            type={"email"}
            name={"email"}
            placeholder={"E-postadress"}
            label={"E-postadress"}
            changeHandler={changeHandler}
          />{" "}
          <MainInput
            className={"p-1 w-full border border-black rounded-lg"}
            type={"number"}
            name={"phone"}
            placeholder={"Telefon"}
            label={"Telefon"}
            changeHandler={changeHandler}
          />
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
              Skapa
            </button>
            <Link href={"/auth/login"}>
              <span className="text-sm text-blue-600">
                Redan har ett konto?{" "}
              </span>
              Logga in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
