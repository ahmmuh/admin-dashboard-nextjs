"use client";
import { deleteKey, getAllKeys, getKeyByID, updateKey } from "@/backend/keyAPI";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditKey() {
  const [key, setKey] = useState({
    keyLabel: "",
    location: "",
  });
  const params = useParams();

  const keyId = params.keyId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Hämta Key ID från useSearch();

  // const { keyId } = useSearchParams();
  console.log("KEY ID: i Edit key page", keyId);
  //Routing

  const router = useRouter();
  //Lyssna input change

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setKey((prevKey) => ({
      ...prevKey,
      [name]: value,
    }));
  };

  const fetchKey = async () => {
    try {
      const foundedKey = await getKeyByID(keyId);
      if (!foundedKey) {
        throw new Error(`Den sökta nyckel med ID: ${keyId} finns ej`);
      }
      console.log(`Den hämtade nyckel är ${foundedKey}`);
      setKey(foundedKey);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      throw new Error(
        `Error vid hämtning av nyckel. Meddelandes:${error.message}`
      );
    }
  };

  //Update key (nyckel)
  const changeKeyHandler = async (e) => {
    e.preventDefault();
    try {
      if (!keyId) {
        console.log("KEY ID SAKNAS");
      }

      const updatedKey = await updateKey(keyId, key);
      console.log("Updated Key", updatedKey);
      router.back();
    } catch (error) {
      console.error("Error vid uppdatering av KEY", error);
    }
  };

  useEffect(() => {
    if (keyId) {
      setKey((prevKey) => ({
        ...prevKey,
        keyLabel: key.keyLabel,
        location: key.location,
        updatedAt: new Date().toLocaleDateString(),
      }));
    }
  }, [keyId]);

  useEffect(() => {
    if (keyId) {
      fetchKey();
    }
  }, [keyId]);

  //Delete key
  const deleteKeyHandler = async (e) => {
    e.preventDefault();
    if (keyId) {
      await deleteKey(keyId);
      router.back();
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <h4>Loading ...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-red-500 text-white p-10">
        <h4>Error {error.message}</h4>
      </div>
    );
  }
  return (
    <div className="w-full border border-x-2 py-5 px-2">
      <div className="flex flex-col">
        <h2 className="text-2xl text-purple-500 font-bold mb-5">
          Uppdatera nyckel 🔑🔑 {key.keyLabel}
        </h2>
        <form>
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

          <div className="flex justify-start  p-4 ">
            <button
              onClick={deleteKeyHandler}
              className="bg-red-400 text-white text-center px-4 py-2 w-64 hover:bg-red-500">
              Delete
            </button>
            <button
              onClick={changeKeyHandler}
              className="bg-green-400  text-white text-center px-4 py-2 w-64 ml-4 hover:bg-green-500">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditKey;
