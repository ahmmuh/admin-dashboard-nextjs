"use client";
import { signIn, signUp } from "@/backend/authAPI";
import MainInput from "@/components/input";
import { useFetchUnits } from "@/customhook/useFetchUnits";
import { displaySuccessMessage } from "@/helper/toastAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUpPage() {
  const router = useRouter();
  const { units } = useFetchUnits();
  console.log("UNITS", units);
  const roles = ["Chef", "Specialist"];

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "",
    unit: "",
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
      const { unit, ...rest } = user;
      const userInfo = {
        // name: user.name,
        // email: user.email,
        // phone: user.phone,
        // username: user.username,
        // password: user.password,
        // role: user.role,
        // unit: user.unit,
        ...rest,
        unitId: user.unit,
      };
      console.log("New användare", userInfo);
      await signUp(userInfo);
      displaySuccessMessage("Ny Användare registrerats");
      return;
      // router.push("/dashboard/");
    } catch (error) {
      throw new Error("Kunde inte REGISTRERA NY ANVÄNDARE");
    }
  };
  return (
    <div className="mb-6 flex flex-col w-full bg-gray-50">
      <h4 className="text-2xl">Registrera ny användare</h4>
      <div className="flex flex-col p-4 shadow-lg shadow-blue-200 bg-white w-full min-h-fit  ">
        <form onSubmit={SignUpHandler} className="w-full">
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
          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-700"></label>
            <select
              onChange={changeHandler}
              name="role"
              id="role"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="">
              <option value="" disabled>
                -- Välj roll --
              </option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-700"></label>
            <select
              onChange={changeHandler}
              name="unit"
              id="unit"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="">
              <option value="" disabled>
                -- Välj enhet --
              </option>
              {units &&
                units.map((unit) => (
                  <option key={unit._id} value={unit._id}>
                    {unit.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-green-200 w-full p-2 hover:bg-green-300">
              Skapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
