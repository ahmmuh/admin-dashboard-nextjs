"use client";
import {
  createNewKey,
  deleteKey,
  getKeyByID,
  updateKey,
} from "@/backend/keyAPI";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineKey } from "react-icons/hi";

function CreateNewKey() {
  const [key, setKey] = useState({
    keyLabel: "",
    location: "",
  });

  const router = useRouter();
  //Lyssna input change

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setKey((prevKey) => ({
      ...prevKey,
      [name]: value,
    }));
  };

  //Update key (nyckel)
  const addNewKey = async (e) => {
    e.preventDefault();
    if (!key.keyLabel.trim() || !key.location.trim()) {
      toast.error("Alla fält måste fyllas i");
      return;
    }

    try {
      const newKey = {
        keyLabel: key.keyLabel,
        location: key.location,
      };
      console.log("NEW key", newKey);
      await createNewKey(newKey);
      toast.success("Ny nyckel har lagts till");
      router.push("/keys");
    } catch (error) {
      console.error("Error", error.message);
      return;
    }
  };

  return (
    <div className="w-full border border-x-2 py-5 px-2">
      <Toaster />
      <div className="flex flex-col">
        <h2 className="text-2xl text-purple-500 font-bold mb-5">
          Ny nyckel 🔑
        </h2>
        <form onSubmit={addNewKey}>
          <div className="mb-4 w-full ">
            <input
              className="p-2 w-full border border-3 border-b-orange-500 rounded"
              name="keyLabel"
              value={key.keyLabel || ""}
              onChange={changeHandler}
              placeholder="Namn på nyckeln"
            />
          </div>
          <div className="mb-4 w-full ">
            <input
              className="p-2 w-full border border-b-3 border-b-orange-500"
              name="location"
              value={key.location || ""}
              placeholder="Vilken enhet"
              onChange={changeHandler}
            />
          </div>

          <button
            className={` cursor-pointer p-2 w-80 border rounded-2xl bg-green-200 text-black hover:bg-green-300 hover:text-white `}>
            Spara
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewKey;
