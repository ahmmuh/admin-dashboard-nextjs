"use client";

import { checkoutKey, checkinKey } from "@/backend/keyAPI";
import { useFetchKeys } from "@/customhook/useFetchKeys";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import KeyTable from "../keyTable";

const KeyDetailComponent = () => {
  const { users } = useFetchUsers();
  const { keys, loading, error } = useFetchKeys();
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
      await checkoutKey(selectedUserId, key._id);
      toast.success("Nyckeln har lånats ut!");
      router.push("/dashboard/keys");
    } catch (error) {
      console.error("Error", error);
      toast.error("Kunde inte låna ut nyckeln.");
    }
  };

  const checkInHandler = async (key) => {
    const userId = selectedUserId;
    if (!selectedUserId || !selectedUser) {
      toast.error("Välj en lånetagare.");
      return;
    }

    if (
      key.borrowedBy !== selectedUserId &&
      key.borrowedBy?._id !== selectedUserId
    ) {
      toast.error("Fel lånetagare vald för denna nyckel.");
      return;
    }

    try {
      await checkinKey(userId, key._id);
      toast.success("Nyckeln har återlämnats!");
      router.push("/dashboard/keys");
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

  availableKeys.length = 0;
  keysWithBorrowedStatus.length = 0;

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

      {/* Toggle-knappar */}
      <div className="flex justify-around mb-5 ">
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
          </div>

          {/* Meddelande om inga nycklar att låna */}
          {availableKeys.length === 0 && (
            <p className="text-red-500 mt-2">
              Det finns inga nycklar tillgängliga för utlåning just nu.
            </p>
          )}

          {selectedKey &&
            (selectedKey.status === "returned" ||
              selectedKey.status === "available") && (
              <div className="mb-6">
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
              </div>
            )}

          {/* Visa bara om nyckel och användare är valda */}
          {selectedKey && (
            <KeyTable
              keyData={selectedKey}
              onClick={() => checkOutHandler(selectedKey)}
              actionLabel="Låna"
              btnColor="text-white-500"
              bgColor="bg-green-500"
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

          {/* Meddelande om inga nycklar att återlämna */}
          {keysWithBorrowedStatus.length === 0 && (
            <p className="text-red-500 mt-2">
              Det finns inga nycklar att återlämna just nu.
            </p>
          )}

          {selectedKey && selectedKey.status === "checked-out" && (
            <div className="mb-6">
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
            </div>
          )}

          {selectedKey && (
            <KeyTable
              keyData={selectedKey}
              onClick={() => checkInHandler(selectedKey)}
              actionLabel="Lämna in"
              actionColor="text-white-700"
              bgColor="bg-red-400"
            />
          )}
        </>
      )}
    </div>
  );
};

export default KeyDetailComponent;
