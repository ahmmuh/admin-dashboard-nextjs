"use client";
import { addChefToUnit, addSpecialistToUnit, getUnitByID } from "@/backend/api";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CreateSpecialistComponent({ unitId }) {
  console.log("Unit ID i frontend i (CreateSpecialistComponent):", unitId);
  const router = useRouter();
  const [specialistData, setSpecialistData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // const [unit, setUnit] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSpecialistData((prevData) => ({ ...prevData, [name]: value || "" })); // Sätt alltid en sträng
  };

  useEffect(() => {
    if (unitId) {
      setSpecialistData({
        name: specialistData.name,
        phone: specialistData.phone,
        email: specialistData.email,
      });
    }
  }, [unitId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("unitId, specialistData", unitId, specialistData);
      await addSpecialistToUnit(unitId, specialistData);
      console.log(
        `Ny specialist med följande data ${specialistData.name} har lagts i databasen`
      );
      displaySuccessMessage(`Ny specialist har lagts i databasen`);
      router.push(`/dashboard/units/${unitId}/specialister`);
    } catch (error) {
      console.error(`Det gick inte att lägga till ny chef`);
      displayErrorMessage(`Det gick inte att lägga till ny Specialist`);
      router.push(`/dashboard/units/${unitId}/specialister`);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4 w-full">
      <h4 className="text-pink-400 text-2xl">Lägg till ny specialist</h4>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="p-2 bg-gray-200 rounded-2xl w-full  border border-b-gray-50
                shadow shadow-blue-200 focus:bg-yellow-50"
            placeholder="Name"
            value={specialistData.name}
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
            value={specialistData.phone}
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
            value={specialistData.email}
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

export default CreateSpecialistComponent;
