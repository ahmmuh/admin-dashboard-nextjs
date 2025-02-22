"use client";
import { addChefToUnit } from "@/backend/api";
import React, { useEffect } from "react";
import { useState } from "react";

function CreateChef({ unitId }) {
  console.log(
    "Skickar request till:",
    `http://localhost:8000/api/units/${unitId}/chefer`
  );
  console.log("Unit ID i frontend:", unitId);

  const [chefData, setChefData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setChefData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (unitId) {
      setChefData({
        name: chefData.name,
        phone: chefData.phone,
        email: chefData.email,
      });
    }
  }, [unitId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const chef = await addChefToUnit(unitId, chefData);
      console.log(
        `Ny chef med följande data ${chefData} har lagts i databasen`
      );
    } catch (error) {
      console.error(`Det gick inte att lägga till ny chef`);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4 w-full">
      <h4 className="text-pink-400 text-2xl">Lägg till ny chef</h4>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="p-2 bg-gray-200 rounded-2xl w-full  border border-b-gray-50
                shadow shadow-blue-200 focus:bg-yellow-50"
            placeholder="Name"
            value={chefData.name}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="phone"
            className="p-2 bg-gray-200 rounded-2xl w-full border border-b-gray-50
                shadow shadow-blue-200 focus:bg-yellow-50"
            placeholder="Telefon"
            value={chefData.phone}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            className="p-2 bg-gray-200 rounded-2xl w-full border border-b-gray-50
                shadow shadow-blue-200 focus:bg-yellow-50"
            placeholder="E-post"
            value={chefData.email}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="bg-green-400 w-full  p-2 text-center  border border-b-gray-200 shado shadow-slate-400
          hover:bg-green-500 text-white">
          Spara
        </button>
      </form>
    </div>
  );
}

export default CreateChef;
