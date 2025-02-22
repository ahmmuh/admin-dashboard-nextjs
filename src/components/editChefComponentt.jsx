"use client";
import { updateChef } from "@/backend/api";
import React, { useEffect, useState } from "react";

function EditChefComponent({ unitId, chef }) {
  const [chefData, setChefData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (chef) {
      setChefData({
        name: chef.name || "Ingen chef",
        phone: chef.phone || "Inget telefonnummer",
        email: chef.email || "ingen e-postadress",
      });
    }
  }, [chef]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setChefData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //
  const updateChefHandler = async (e) => {
    e.preventDefault();

    console.log("unitId:", unitId); // Logga unitId
    console.log("chefId:", chef.chefId); // Logga chefId
    if (!chef.chefId || !unitId) {
      console.error(`Det saknas chefID eller unitID`);
      return;
    }
    try {
      const updatedChef = await updateChef(unitId, chef.chefId, chefData);
      console.log(`Chef med ${updatedChef.chefId} har uppdaterats`);
    } catch (error) {
      console.error(`PROBLEM: Vid uppdatering chef: ${error.message}`);
    }
  };
  return (
    <div className="flex flex-col justify-center gap-y-4">
      {chef && (
        <h3 className="text-purple-600 text-2xl ">Du redigerar {chef.name}</h3>
      )}
      <form onSubmit={updateChefHandler}>
        <div className="flex flex-1 mb-4">
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={chefData.name}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-1 mb-4">
          <input
            type="number"
            name="phone"
            min={0}
            className="w-full p-2 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={chefData.phone}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-1 mb-4">
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={chefData.email}
            onChange={changeHandler}
          />
        </div>
        <button className="bg-green-500 text-white p-2 w-32 rounded-xl">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditChefComponent;
