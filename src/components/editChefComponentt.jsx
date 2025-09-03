"use client";
import LoadingPage from "@/app/loading";
import { updateUser } from "@/backend/api";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiStop } from "react-icons/hi";

function EditChefComponent({ unitId, chef }) {
  const { currentUser } = useFetchCurrentUser();
  const router = useRouter();
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
      const updatedUser = await updateUser(chef.chefId, chefData);
      console.log(`Chef med ${updatedUser.chefId} har uppdaterats`);
      displaySuccessMessage(`Chef har uppdaterats`);
      router.push(`/dashboard/units/${unitId}/chefer`);
    } catch (error) {
      console.error(`PROBLEM: Vid uppdatering chef: ${error.message}`);
      displayErrorMessage(`PROBLEM: Vid uppdatering`);
      router.push(`/dashboard/units/${unitId}/chefer`);
    }
  };
  return (
    <div className="flex flex-col justify-center gap-y-4">
      {currentUser && (
        <h3 className="text-blue-600 text-xl ">Du redigerar {chef.name}</h3>
      )}

      {currentUser ? (
        <form onSubmit={updateChefHandler}>
          <div className="flex flex-1 mb-4">
            <input
              type="text"
              name="name"
              className="w-full px-2 py-1 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
              value={chefData.name}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-1 mb-4">
            <input
              type="number"
              name="phone"
              min={0}
              className="w-full px-2 py-1 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
              value={chefData.phone}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-1 mb-4">
            <input
              type="email"
              name="email"
              className="w-full px-2 py-1 border border-gray-400 bg-gray-200 focus:bg-orange-50 rounded-xl"
              value={chefData.email}
              onChange={changeHandler}
            />
          </div>
          <button className="p-2 w-32  bg-indigo-200  border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-300 transition">
            Spara
          </button>
        </form>
      ) : (
        <p>
          Du kan inte redigera denna användare <HiStop />
        </p>
      )}
    </div>
  );
}

export default EditChefComponent;
