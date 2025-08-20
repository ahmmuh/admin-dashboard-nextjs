"use client";

import { useFetchUsers } from "@/customhook/useFetchUsers";
import {
  HiOutlinePencil,
  HiOutlineRefresh,
  HiOutlineTrash,
} from "react-icons/hi";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchUser from "@/components/users/searchUser";
import LoadingPage from "@/app/loading";
import { deleteUser } from "@/backend/userAPI";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";

function UserPage() {
  const { users, loading, error } = useFetchUsers();
  const [userList, setUserList] = useState([]);
  const { currentUser } = useFetchCurrentUser();
  // const deleteHandler = async (id) => {
  //   console.log("Denna användare kommer tas bort", id);
  //   try {
  //     const user = await deleteUser(id);
  //     console.log(`Användare med ID ${id} har tagits bort`);
  //     displaySuccessMessage("Användaren har tagits bort");
  //     return user;
  //   } catch (error) {
  //     displayErrorMessage("Fel vid borttagning av användare");
  //     console.log(
  //       `Fel vid borttagning av user med ID ${id} message: ${error.message}`
  //     );
  //   }
  // };
  const refetch = () => {
    setUserList(users);
  };

  useEffect(() => {
    if (users && users.length > 0) {
      setUserList(users);
    }
  }, [users]);

  const deleteHandler = async (id) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort användaren?"
    );
    if (!confirmed) return;

    try {
      await deleteUser(id);
      displaySuccessMessage("Användaren har tagits bort");

      setUserList((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      displayErrorMessage("Fel vid borttagning av användare");
      console.log(`Fel: ${error.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Användaröversikt</h1>
      <SearchUser />

      {loading && <LoadingPage message="Hämtar alla användare..." />}
      {error && (
        <p className="text-red-600">Fel vid hämtning: {error.message}</p>
      )}

      {!loading && !error && userList?.length === 0 && (
        <p>Inga användare hittades.</p>
      )}

      {!loading && !error && userList?.length > 0 && (
        <div
          className={` ${
            userList.length > 15 ? "max-h-[400px] overflow-y-auto" : ""
          }`}>
          <table className="w-full border border-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 border-b">Namn</th>
                <th className="text-left px-4 py-2 border-b">E-post</th>
                <th className="text-left px-4 py-2 border-b">Telefon</th>
                <th className="text-left px-4 py-2 border-b">Roll</th>
                <th className="text-left px-4 py-2 border-b">Enhet</th>
                {currentUser &&
                  currentUser.role !== "Enhetschef" &&
                  currentUser.roler !== "Specilare" && (
                    <th className="text-left px-4 py-2 border-b">Åtgärder</th>
                  )}
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.phone}</td>
                  <td className="px-4 py-2 border-b">
                    {user.role?.map((r, i) => (
                      <span key={i} className="block">
                        {r}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {user.unit?.name || "-"}
                  </td>

                  {currentUser &&
                    currentUser.role !== "Enhetschef" &&
                    currentUser.roler !== "specialare" && (
                      <td className="px-4 py-2 border-b">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/users/${user._id}/edit`}
                            className="p-2 border border-gray-300 rounded
                            >
                      
                      hover:bg-gray-100 transition"
                            title="Uppdatera">
                            <HiOutlinePencil className="text-gray-600 w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                            title="Ta bort">
                            <HiOutlineTrash className="text-gray-600 w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserPage;
