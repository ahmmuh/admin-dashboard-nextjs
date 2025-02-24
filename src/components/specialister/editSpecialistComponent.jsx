"use client";
import { updateSpecialist } from "@/backend/api";
import React, { useEffect, useState } from "react";

function EditSpecialistComponent({ unitId, specialist }) {
  console.log("Specialist i EditSpecialistComponent ", specialist);
  const [specialistData, setSpecialistData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (specialist) {
      setSpecialistData({
        name: specialist.name || "Ingen specialist",
        phone: specialist.phone || "Inget telefonnummer",
        email: specialist.email || "ingen e-postadress",
      });
    }
  }, [specialist]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSpecialistData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //
  const updateSpecialistHandler = async (e) => {
    e.preventDefault();

    console.log("unitId : i updateSpecialistHandler", unitId); // Logga unitId
    console.log(
      "specialistId i updateSpecialistHandler:",
      specialist.specialistId
    ); // Logga specialistId
    if (!specialist.specialistId || !unitId) {
      console.error(`Det saknas specialistId eller unitID`);
      return;
    }
    try {
      const updatedSpecialist = await updateSpecialist(
        unitId,
        specialist.specialistId,
        specialistData
      );
      console.log(
        `specialist med ${updatedSpecialist.specialistId} har uppdaterats`
      );
    } catch (error) {
      console.error(`PROBLEM: Vid uppdatering specialist: ${error.message}`);
      setSpecialistData(null);
    }
  };
  return (
    <div className="flex flex-col justify-center">
      {specialist && (
        <h3 className="text-purple-600 text-2xl ">
          Du redigerar {specialist.name} med ID: {specialist.specialistId}
        </h3>
      )}
      <form onSubmit={updateSpecialistHandler}>
        <div className="flex flex-1 mb-4">
          <input
            type="text"
            name="name"
            className="w-full  border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={specialistData.name}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-1 mb-4">
          <input
            type="number"
            name="phone"
            min={0}
            className="w-full  border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={specialistData.phone}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-1 mb-4">
          <input
            type="email"
            name="email"
            className="w-full border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={specialistData.email}
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

export default EditSpecialistComponent;
