"use client";

import { signUp } from "@/backend/authAPI";
import MainInput from "@/components/input";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function NewUserPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const SignUpHandler = async (e) => {
    e.preventDefault();

    if (!user.name || !user.name.trim()) {
      displayErrorMessage("Ange användarens namn.");
      return;
    }

    if (!user.email || !user.email.trim()) {
      displayErrorMessage("Ange e-postadress.");
      return;
    }

    if (!user.password || !user.password.trim()) {
      displayErrorMessage("Ange lösenord.");
      return;
    }

    // Extra: kontrollera minsta längd (valfritt)
    if (user.password.length < 6) {
      displayErrorMessage("Lösenordet måste vara minst 6 tecken långt.");
      return;
    }

    if (!user.phone || !user.phone.trim()) {
      displayErrorMessage("Ange telefonnummer.");
      return;
    }

    if (!user.username || !user.username.trim()) {
      displayErrorMessage("Ange användarnamn.");
      return;
    }
    try {
      await signUp(user);
      displaySuccessMessage("Registrering lyckades");
      router.push("/dashboard/");
    } catch (err) {
      // console.error("Registrering misslyckades", err);
      setError(err.message || "Något gick fel");
      return;
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full  bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Läg till ny användare
        </h2>
        <form onSubmit={SignUpHandler} className="space-y-4">
          <MainInput
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="name"
            placeholder="Namn"
            label=""
            changeHandler={changeHandler}
          />

          <MainInput
            className="w-full p-2 border border-gray-300 rounded-md"
            type="email"
            name="email"
            placeholder="E-post"
            label=""
            changeHandler={changeHandler}
          />

          <MainInput
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="username"
            placeholder="Användarnamn"
            label=""
            changeHandler={changeHandler}
          />

          <MainInput
            className="w-full p-2 border border-gray-300 rounded-md"
            type="tel"
            name="phone"
            placeholder="Telefonnummer"
            label=""
            changeHandler={changeHandler}
          />

          <MainInput
            className="w-full p-2 border border-gray-300 rounded-md"
            type="password"
            name="password"
            placeholder="Lösenord"
            label=""
            changeHandler={changeHandler}
          />

          <button
            type="submit"
            className="p-2 w-1/3 bg-indigo-100 text-indigo-800 font-medium 
             border border-indigo-200 rounded-md shadow-sm 
             hover:bg-indigo-200 transition">
            Registrera
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewUserPage;
