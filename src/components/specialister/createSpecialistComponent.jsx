"use client";
import { addChefToUnit, getUnitByID } from "@/backend/api";
import { get } from "mongoose";
import React, { useEffect } from "react";
import { useState } from "react";

function CreateSpecialistComponent({ unitId }) {
  console.log("Unit ID i frontend i (CreateSpecialistComponent):", unitId);

  const [specialistData, setSpecialistData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [unit, setUnit] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSpecialistData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getUnit = async () => {
    try {
      const unit = await getUnitByID(unitId);
      console.log("Unit i create specialist component");
      console.log(unit);
      console.log("Type of", typeof unit.specialister);
      if (unit.specialister) {
        setSpecialistData(unit);
        console.log("Hittade UNIT", unit);
        return <div>Enheten har Specialist som heter {unit.chef.name} </div>;
      }
      console.log(`Enheten med ID ${unitId} har ingen chef`);
    } catch (error) {
      console.error(`Något gick fel ${error.message}`);
    }
  };
  useEffect(() => {
    if (unitId) {
      setSpecialistData({
        name: specialistData.name,
        phone: specialistData.phone,
        email: specialistData.email,
      });
    }
    getUnit();
  }, [unitId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("unitId, chefData", unitId, specialistData);
      const chef = await addChefToUnit(unitId, specialistData);
      console.log(
        `Ny chef med följande data ${specialistData.name} har lagts i databasen`
      );
    } catch (error) {
      console.error(`Det gick inte att lägga till ny chef`);
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
