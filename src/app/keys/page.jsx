"use client";
import { checkinKey, checkoutKey, getAllKeys } from "@/backend/keyAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function KeyPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keys, setKeys] = useState([]);
  const router = useRouter();

  // låne och återlämna actions
  // const checkOutHandler = async (key) => {
  //   const userId = key.borrowedBy ? key.borrowedBy : key.lastBorrowedBy;
  //   const userType = key.borrowedByModel || key.lastBorrowedByModel;
  //   const fixedUserType = userType === "Specialist" ? "specialister" : "chefer";
  //   console.log("userType by checkOutHandler()", fixedUserType);
  //   try {
  //     await checkoutKey(fixedUserType, userId, key._id);
  //     toast.success("Nyckeln har lånats ut");
  //     await fetchKeys();
  //   } catch (error) {
  //     console.error("Error");
  //   }
  // };

  const checkInHandler = async (key) => {
    const userId = key.borrowedBy ? key.borrowedBy : key.lastBorrowedBy;

    if (!userId) {
      console.error("Ingen användare kopplad till denna nyckel");
      return null;
    }
    const userType = key.borrowedByModel || key.lastBorrowedByModel;
    const fixedUserType = userType === "Specialist" ? "specialister" : "chefer";
    console.log("userType by checkInHandler()", fixedUserType);
    console.log("User ID:", userId);
    console.log("Nyckel ID", key._id);
    try {
      await checkinKey(fixedUserType, userId._id, key._id);
      await fetchKeys();
      toast.success("Nyckeln har återlämnats");
    } catch (error) {
      console.error("Error");
      toast.error("Något har gått fel");
    }
  };

  //Fetch alla nycklar

  const fetchKeys = async () => {
    try {
      const keyList = await getAllKeys();
      if (keyList.length === 0) {
        console.log("Nycklar finns ingte");
      }
      console.log("ALla hämtade nycklar", keyList);
      setKeys(keyList);
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av nycklar", error.message);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <h5>Loading .....</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-red-600 p-10">
        <h4 className="text-2xl text-white-500">Error</h4>
      </div>
    );
  }
  return (
    <div>
      <Toaster />
      <h1 className="text-2xl font-bold mb-10 text-purple-500 italic">
        Nyckel hantering
      </h1>
      <div className="pr-10">
        <table className=" border border-gray-400 w-full ">
          <thead>
            <tr className="">
              <th className="border border-gray-200 text-left">
                Nyckelbeteckning
              </th>
              <th className="border border-gray-200 text-left">Plats</th>
              <th className="border border-gray-200 text-left">Status</th>
              <th className="border border-gray-200 text-left">Lånetagare</th>
              <th className="border border-gray-200 text-left">
                Utlånat datum
              </th>
              <th className="border border-gray-200 text-left">
                Inlämnat datum
              </th>
              <th className="border border-gray-200 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key._id} className="hover:bg-gray-300">
                <td className="border border-gray-200 p-2">
                  <Link href={`/keys/${key._id}/`}>{key.keyLabel}</Link>
                </td>
                <td className="border border-gray-200 p-2">{key.location}</td>
                <td className="border border-gray-200 p-2">
                  {key.status === "available" && (
                    <span className="text-green-700 font-bold">Inne</span>
                  )}

                  <span className="text-green-700 font-bold">
                    {key.status === "returned" && "Inlämnad"}
                  </span>

                  <span className="text-red-700 font-bold">
                    {key.status === "checked-out" && "Utlånad"}
                  </span>
                </td>
                <td className="border border-gray-200 p-2">
                  {key.status === "checked-out" ? key.borrowedBy.name : "—"}
                </td>

                <td className="border border-gray-200 p-2">
                  {key.status === "checked-out" && key.borrowedAt
                    ? new Date(key.borrowedAt).toLocaleString("sv-SE")
                    : "—"}
                </td>
                <td className="border border-gray-200 p-2">
                  {key.status === "returned" && key.returnedAt
                    ? new Date(key.returnedAt).toLocaleString("sv-SE")
                    : "—"}
                </td>
                {key.status === "returned" && (
                  <td className="text-green-500 font-bold p-2">
                    {/* <button onClick={() => checkOutHandler(key)}>Link </button>
                     */}
                    <Link href={`/keys/${key._id}/borrow`}>Låna</Link>
                  </td>
                )}
                {key.status === "available" && (
                  <td className="text-green-500 font-bold p-2">
                    {/* <button onClick={() => checkOutHandler(key)}>Link</button> */}
                    <Link href={`/keys/${key._id}/borrow`}>Låna</Link>
                  </td>
                )}
                {key.status === "checked-out" && (
                  <td className="text-red-500 p-2">
                    <button onClick={() => checkInHandler(key)}>
                      Lämna in
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KeyPage;
