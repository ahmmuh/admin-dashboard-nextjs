"use client";
import { updateUser } from "@/backend/api";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

function EditSpecialistComponent({ specialist, unitId }) {
  // console.log("Specialist i EditSpecialistComponent ", specialist);
  const router = useRouter();
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

    // console.log(
    //   "specialistId i updateSpecialistHandler:",
    //   specialist.specialistId
    // ); // Logga specialistId
    if (!specialist.specialistId) {
      // console.error(`Det saknas specialistId eller unitID`);
      return;
    }
    try {
      const updatedSpecialist = await updateUser(
        specialist.specialistId,
        specialistData
      );
      // console.log(
      //   `specialist med ${updatedSpecialist.specialistId} har uppdaterats`
      // );
      displaySuccessMessage("Specialist har uppdaterats");
      router.push(`/dashboard/units/${unitId}/specialister`);
    } catch (error) {
      // console.error(`PROBLEM: Vid uppdatering specialist: ${error.message}`);
      setSpecialistData(null);
      displayErrorMessage(
        `PROBLEM: Vid uppdatering specialist: ${error.message}`
      );
      router.push(`/units/${unitId}/specialister`);
    }
  };
  return (
    <div className="flex flex-col justify-center my-5">
      {specialist && (
        <h3 className="text-blue-600 text-2xl ">
          Du redigerar {specialist.name}
        </h3>
      )}
      <form onSubmit={updateSpecialistHandler}>
        <div className="flex flex-1 my-4">
          <input
            type="text"
            name="name"
            className="w-full px-2 py-1 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={specialistData.name}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-1 mb-4">
          <input
            type="number"
            name="phone"
            min={0}
            className="w-full px-2 py-1 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={specialistData.phone}
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-1 mb-4">
          <input
            type="email"
            name="email"
            className="w-full px-2 py-1 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
            value={specialistData.email}
            onChange={changeHandler}
          />
        </div>
        <button className="p-2 w-32  bg-indigo-200  border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-300 transition">
          Spara
        </button>
      </form>
    </div>
  );
}

export default EditSpecialistComponent;
