"use client";
import { AddNewKeyWithQrCode, getKeyByID } from "@/backend/keyAPI";
import { useFetchKeys } from "@/customhook/useFetchKeys";
import { useFetchUnits } from "@/customhook/useFetchUnits";
import { displayErrorMessage } from "@/helper/toastAPI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function KeyQRCodePage() {
  const [key, setKey] = useState({
    keyLabel: "",
    unit: "",
  });

  const { units } = useFetchUnits();
  const router = useRouter();

  //Key från databasen för att jämföra med den nya key
  const [foundedKey, setFoundedKey] = useState(null);

  const { keys } = useFetchKeys();
  async function findKey(keyLabel) {
    try {
      if (!keys || !Array.isArray(keys)) return null;
      for (const k of keys) {
        if (k.keyLabel === keyLabel) {
          // jämför med keyLabel istället för ID
          return k; // hittad key
        }
      }
      return null; // ingen key hittad
    } catch (error) {
      console.error("Kunde inte hämta nyckel:", error);
      return null;
    }
  }

  // Lyssna på input & select changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setKey((prevKey) => ({
      ...prevKey,
      [name]: value,
    }));
  };

  // Skapa ny nyckel
  const addNewKey = async (e) => {
    e.preventDefault();
    if (!key.keyLabel || !key.keyLabel.trim()) {
      displayErrorMessage("Ange nyckelns namn eller etikett.");
      return;
    }

    if (!key.unit || !key.unit.trim()) {
      displayErrorMessage("Välj en enhet för nyckeln.");
      return;
    }

    try {
      const existingKey = await findKey(key.keyLabel);
      if (existingKey) {
        toast.error(`Nyckel med namn: ${existingKey.keyLabel} finns redan`);
        return;
      }
      const newKey = {
        keyLabel: key.keyLabel,
        unitId: key.unit,
      };

      findKey();
      // console.log("NEW key", newKey);
      await AddNewKeyWithQrCode(newKey);
      toast.success("Ny nyckel har lagts till");
      router.push("/dashboard/keys");
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <div className="w-full border border-x-2  px-2">
      <Toaster />
      <div className="flex flex-col">
        <h2 className=" text-blue-500 font-bold mb-3">
          Lägg till ny nyckel 🔑
        </h2>
        <form onSubmit={addNewKey}>
          <div className="mb-4 w-full ">
            <input
              className="p-2 w-full border border-3 border-b-orange-500 rounded"
              name="keyLabel"
              value={key.keyLabel}
              onChange={changeHandler}
              placeholder="Namn på nyckeln"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1 relative mb-4">
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700 mb-1">
              Enhet
            </label>
            <select
              id="unit"
              name="unit"
              value={key.unit}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>
                -- Välj enhet --
              </option>
              {units &&
                Array.isArray(units) &&
                units.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="cursor-pointer p-2 w-80 border rounded-2xl bg-indigo-200 border-indigo-300 shadow-sm hover:bg-indigo-300 transition">
            Spara
          </button>
        </form>

        {key && key.qrCode && (
          <div className="flex mt-4">
            <Image
              width={500}
              height={500}
              src={key.qrCode}
              alt="Nyckel QR Code"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default KeyQRCodePage;
