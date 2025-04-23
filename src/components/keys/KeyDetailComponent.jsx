"use client";
import { getAllKeys } from "@/backend/keyAPI";
import React, { useState } from "react";
import { useFetchKeys } from "@/customhook/useFetchKeys";

const KeyDetailComponent = () => {
  const { keys, loading, error } = useFetchKeys();
  const [selectedKeyId, setSelectedKeyId] = useState(null);

  const handleSelectChange = (e) => {
    setSelectedKeyId(e.target.value);
  };

  const selectedKey = keys.find((key) => key._id === selectedKeyId);

  console.log("Valda nyckel ", selectedKey);

  //låna nyckel

  const checkOutHandler = async (key) => {
    const userId = key.borrowedBy ? key.borrowedBy : key.lastBorrowedBy;
    const userType = key.borrowedByModel || key.lastBorrowedByModel;
    const fixedUserType = userType === "Specialist" ? "specialister" : "chefer";
    console.log("userType by checkOutHandler()", fixedUserType);
    try {
      //   await checkoutKey(fixedUserType, userId, key._id);
      toast.success("Nyckeln har lånats ut");
    } catch (error) {
      console.error("Error");
    }
  };

  console.log("selectedKey", selectedKey);
  if (loading) return <p>Laddar nycklar...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className="p-5">
      <h4 className="text-purple-500 text-2xl mb-4">Låna nyckel</h4>
      <form className="w-1/2 mb-6 ">
        <select
          name="selectedKey"
          onChange={handleSelectChange}
          className="w-full bg-gray-200 px-5 py-2 text-black">
          <option disabled hidden value=""></option>
          {keys &&
            keys.map((key) => (
              <option key={key._id} value={key._id}>
                {key.keyLabel}
              </option>
            ))}
        </select>
      </form>
      {selectedKey && (
        <div className=" p-3">
          <table className="border border-gray-400 w-full ">
            <thead className="bg-gray-400 py-3">
              <tr className="">
                <th className="border border-gray-200 text-left">
                  Nyckelbeteckning
                </th>
                <th className="border border-gray-200 text-left">Plats</th>
                <th className="border border-gray-200 text-left">Status</th>
                <th className="border border-gray-200 text-left">
                  {selectedKey.status === "checked-out" && "Utlånat datum"}
                  {selectedKey.status === "returned" && "Inlämnat datum"}
                </th>

                <th className="border border-gray-200 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" hover:bg-gray-100">
                <td className="border border-gray-200 p-2">
                  {selectedKey.keyLabel}
                </td>
                <td className="border border-gray-200 p-2">
                  {selectedKey.location}
                </td>
                <td className="border border-gray-200 p-2">
                  {selectedKey.status === "checked-out" && "Utlånad"}
                  <span className="text-green-600 font-bold">
                    {selectedKey.status === "returned" && "Inne"}
                  </span>
                </td>
                <td className="border border-gray-200 p-2">
                  {selectedKey.status === "checked-out" &&
                  selectedKey.borrowedAt
                    ? new Date(selectedKey.borrowedAt).toLocaleString("sv-SE")
                    : "—"}
                  {selectedKey.status === "returned" && selectedKey.returnedAt
                    ? new Date(selectedKey.returnedAt).toLocaleString("sv-SE")
                    : "—"}
                </td>
                <td
                  className={
                    selectedKey.status === "returned"
                      ? "bg-green-400"
                      : "bg-gray-300"
                  }>
                  {selectedKey.status === "returned" && (
                    <button
                      className="border-gray-200 p-2  text-white"
                      onClick={checkOutHandler}>
                      Låna
                    </button>
                  )}
                  {selectedKey.status === "checked-out" && (
                    <button
                      className="border-gray-200 p-2 text-red-500 w-1/2"
                      disabled
                      onClick={() => checkOutHandler(selectedKey)}>
                      X
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KeyDetailComponent;
