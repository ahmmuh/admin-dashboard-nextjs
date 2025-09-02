"use client";
import { addChefToUnit, getUnitByID } from "@/backend/api";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

function CreateChefComponent({ unitId }) {
  const router = useRouter();
  console.log("Unit ID i frontend i (CreateChefComponent):", unitId);

  const [chefData, setChefData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [unit, setUnit] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setChefData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getUnit = async () => {
    try {
      const unit = await getUnitByID(unitId);
      console.log("Unit i create chef component");
      console.log(unit);
      if (unit.chef) {
        setUnit(unit);
        console.log("Hittade UNIT", unit);
        return <div>Enheten har chef som heter {unit.chef.name} </div>;
      }
      console.log(`Enheten med ID ${unitId} har ingen chef`);
    } catch (error) {
      console.error(`Något gick fel ${error.message}`);
    }
  };
  useEffect(() => {
    if (unitId) {
      setChefData({
        name: chefData.name,
        phone: chefData.phone,
        email: chefData.email,
      });
    }
    getUnit();
  }, [unitId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("unitId, chefData", unitId, chefData);
      const chef = await addChefToUnit(unitId, chefData);
      displaySuccessMessage(
        `Ny chef med följande data ${chefData.name} har lagts i databasen`
      );
      console.log(
        `Ny chef med följande data ${chefData.name} har lagts i databasen`
      );
      router.push("/chefer");
    } catch (error) {
      console.error(`Det gick inte att lägga till ny chef`);
      displayErrorMessage("Det gick inte att lägga till ny chef");
      router.push("/chefer");
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
          className="bg-indigo-200  border-indigo-300 rounded-md shadow-sm hover:bg-indigo-300 transition w-full  p-2 text-center  border border-b-gray-200 shado shadow-slate-400
          text-white">
          Spara
        </button>
      </form>
    </div>
  );
}

export default CreateChefComponent;
