"use client";

import { checkoutKey, checkinKey } from "@/backend/keyAPI";
import { useFetchKeys } from "@/customhook/useFetchKeys";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const KeyDetailComponent = () => {
  const { users } = useFetchUsers();
  const { keys, fetchKeys, loading, error } = useFetchKeys();
  const [selectedKeyId, setSelectedKeyId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isShowForm, setShowForm] = useState(true);

  const router = useRouter();

  const handleSelectChange = (e) => {
    setSelectedKeyId(e.target.value);
  };

  const handleBorrowChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const selectedKey = keys.find((key) => key._id === selectedKeyId) || null;
  const selectedUser =
    users.find((user) => user._id === selectedUserId) || null;

  const checkOutHandler = async (key) => {
    if (!selectedUserId || !selectedUser) {
      toast.error("Välj en lånetagare.");
      return;
    }

    try {
      key.lastBorrowedByModel = selectedUser.userType;
      await checkoutKey(selectedUser.userType, selectedUserId, key._id);
      toast.success("Nyckeln har lånats ut!");
      router.push("/keys");
    } catch (error) {
      console.error("Error", error);
      toast.error("Kunde inte låna ut nyckeln.");
    }
  };

  const checkInHandler = async (key) => {
    const userId = key.lastBorrowedBy;
    const userType = key.borrowedByModel || key.lastBorrowedByModel;

    if (!userId || !userType) {
      toast.error("Ingen lånetagare kopplad till denna nyckel.");
      return;
    }

    const fixedUserType = userType === "Specialist" ? "specialister" : "chefer";

    try {
      await checkinKey(fixedUserType, userId, key._id);
      await fetchKeys();
      toast.success("Nyckeln har återlämnats!");
    } catch (error) {
      console.error("Error", error);
      toast.error("Kunde inte lämna tillbaka nyckeln.");
    }
  };

  const keysWithBorrowedStatus = keys.filter(
    (key) => key.status === "checked-out"
  );
  const availableKeys = keys.filter(
    (key) => key.status === "available" || key.status === "returned"
  );

  const showAvailableKeys = () => {
    setSelectedKeyId(null);
    setSelectedUserId(null);
    setShowForm(true);
  };

  const showBorrowedKeys = () => {
    setSelectedKeyId(null);
    setSelectedUserId(null);
    setShowForm(false);
  };

  if (loading) return <p>Laddar nycklar...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="p-5">
      <Toaster />
      <div className="flex justify-around mb-5">
        <button
          onClick={showAvailableKeys}
          className="border rounded shadow text-black bg-green-100 hover:bg-green-200 w-1/2 mr-2 p-2">
          Låna
        </button>
        <button
          onClick={showBorrowedKeys}
          className="border rounded shadow text-black bg-green-100 hover:bg-green-200 w-1/2 ml-2 p-2">
          Återlämna
        </button>
      </div>

      {isShowForm ? (
        <>
          <h4 className="text-purple-500 text-2xl mb-4">Låna nyckel</h4>
          <div className="flex gap-4 mb-6">
            <select
              onChange={handleSelectChange}
              value={selectedKeyId || ""}
              className="w-full bg-gray-200 px-5 py-2 text-black">
              <option disabled value="">
                Välj nyckel
              </option>
              {availableKeys.map((key) => (
                <option key={key._id} value={key._id}>
                  {key.keyLabel}
                </option>
              ))}
            </select>

            {selectedKey &&
              (selectedKey.status === "returned" ||
                selectedKey.status === "available") && (
                <select
                  onChange={handleBorrowChange}
                  value={selectedUserId || ""}
                  className="w-full bg-gray-200 px-5 py-2 text-black">
                  <option disabled value="">
                    Välj lånetagare
                  </option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              )}
          </div>

          {selectedKey && (
            <KeyTable
              keyData={selectedKey}
              onClick={() => checkOutHandler(selectedKey)}
              actionLabel="Låna"
              btnColor="bg-green-400"
            />
          )}
        </>
      ) : (
        <>
          <h4 className="text-purple-500 text-2xl mb-4">Återlämna nyckel</h4>
          <div className="flex gap-4 mb-6">
            <select
              onChange={handleSelectChange}
              value={selectedKeyId || ""}
              className="w-full bg-gray-200 px-5 py-2 text-black">
              <option disabled value="">
                Välj nyckel
              </option>
              {keysWithBorrowedStatus.map((key) => (
                <option key={key._id} value={key._id}>
                  {key.keyLabel}
                </option>
              ))}
            </select>
          </div>

          {selectedKey && (
            <KeyTable
              keyData={selectedKey}
              onClick={() => checkInHandler(selectedKey)}
              actionLabel="Lämna in"
              actionColor="bg-red-400"
            />
          )}
        </>
      )}
    </div>
  );
};

const KeyTable = ({ keyData, onClick, actionLabel, btnColor }) => {
  return (
    <div className="p-3">
      <table className="border border-gray-400 w-full">
        <thead className="bg-gray-400">
          <tr>
            <th className="border border-gray-200 text-left p-2">
              Nyckelbeteckning
            </th>
            <th className="border border-gray-200 text-left p-2">Plats</th>
            <th className="border border-gray-200 text-left p-2">Status</th>
            <th className="border border-gray-200 text-left p-2">Datum</th>
            <th className="border border-gray-200 text-left p-2">Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="border border-gray-200 p-2">{keyData.keyLabel}</td>
            <td className="border border-gray-200 p-2">{keyData.location}</td>
            <td className="border border-gray-200 p-2">
              {keyData.status === "checked-out" ? (
                <span className="text-red-500 font-bold">Utlånad</span>
              ) : (
                <span className="text-green-600 font-bold">Inne</span>
              )}
            </td>
            <td className="border border-gray-200 p-2">
              {keyData.borrowedAt
                ? new Date(keyData.borrowedAt).toLocaleString("sv-SE")
                : keyData.returnedAt
                ? new Date(keyData.returnedAt).toLocaleString("sv-SE")
                : "Ingen data"}
            </td>
            <td className="border border-gray-200 p-2">
              <button
                onClick={onClick}
                className={`w-full py-2 px-4 text-white rounded ${btnColor}`}>
                {actionLabel}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KeyDetailComponent;
