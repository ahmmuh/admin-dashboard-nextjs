// "use client";

// import { useFetchUsers } from "@/customhook/useFetchUsers";
// import {
//   HiOutlinePencil,
//   HiOutlinePlus,
//   HiOutlineRefresh,
//   HiOutlineTrash,
//   HiPlusCircle,
// } from "react-icons/hi";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import SearchUser from "@/components/users/searchUser";
// import LoadingPage from "@/app/loading";
// import { deleteUser } from "@/backend/userAPI";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import TimeReportPage from "../timeReporting/page";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { faClockFour } from "@fortawesome/free-regular-svg-icons";

// function UserPage() {
//   const { users, loading, error } = useFetchUsers();
//   const [userList, setUserList] = useState([]);
//   const { currentUser } = useFetchCurrentUser();
//   // const deleteHandler = async (id) => {
//   //   console.log("Denna användare kommer tas bort", id);
//   //   try {
//   //     const user = await deleteUser(id);
//   //     console.log(`Användare med ID ${id} har tagits bort`);
//   //     displaySuccessMessage("Användaren har tagits bort");
//   //     return user;
//   //   } catch (error) {
//   //     displayErrorMessage("Fel vid borttagning av användare");
//   //     console.log(
//   //       `Fel vid borttagning av user med ID ${id} message: ${error.message}`
//   //     );
//   //   }
//   // };
//   const refetch = () => {
//     setUserList(users);
//   };

//   useEffect(() => {
//     if (users && users.length > 0) {
//       setUserList(users);
//     }
//   }, [users]);

//   const deleteHandler = async (id) => {
//     const confirmed = window.confirm(
//       "Är du säker på att du vill ta bort användaren?"
//     );
//     if (!confirmed) return;

//     try {
//       await deleteUser(id);
//       displaySuccessMessage("Användaren har tagits bort");

//       setUserList((prev) => prev.filter((user) => user._id !== id));
//     } catch (error) {
//       displayErrorMessage("Fel vid borttagning av användare");
//       // console.log(`Fel: ${error.message}`);
//     }
//   };

//   const isManager =
//     currentUser?.role?.includes("Avdelningschef") ||
//     currentUser?.role?.includes("Områdeschef");

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl text-blue-500 mb-6">Användaröversikt</h1>

//       <div className="flex gap-x-6">
//         <div className="hover:underline">
//           {userList && (
//             <Link
//               className="flex items-center gap-1 text-blue-800 hover:text-blue-900"
//               href={"/dashboard/timeReporting"}>
//               <FontAwesomeIcon icon={faClockFour} className="h-5 w-5" />
//               Närvaro och tider
//             </Link>
//           )}
//         </div>

//         <div className="hover:underline">
//           {isManager && (
//             <Link
//               href="/dashboard/users/create"
//               className="flex items-center gap-1 text-green-800 hover:text-green-900">
//               <HiOutlinePlus className="w-5 h-5" />
//               Ny användare
//             </Link>
//           )}
//         </div>
//       </div>

//       <div className="hidden md:block mt-6">
//         <SearchUser />
//       </div>
//       {loading && <LoadingPage message="Hämtar alla användare..." />}
//       {error && (
//         <p className="text-red-600">Fel vid hämtning: {error.message}</p>
//       )}

//       {!loading && !error && userList?.length === 0 && (
//         <p>Inga användare hittades.</p>
//       )}

//       {!loading && !error && userList?.length > 0 && (
//         <div
//           className={` ${
//             userList.length > 15 ? "max-h-[400px] overflow-y-auto" : ""
//           }`}>
//           <div className="overflow-x-auto rounded-lg shadow border border-gray-200 ">
//             <table className="w-full border border-gray-200 ">
//               <thead className="bg-gray-50 text-xs sticky top-0 z-10">
//                 <tr>
//                   <th className="text-left px-4 py-2 border-b">Namn</th>
//                   <th className="text-left px-4 py-2 border-b">E-post</th>
//                   <th className="text-left px-4 py-2 border-b">Telefon</th>
//                   <th className="text-left px-4 py-2 border-b">Roll</th>
//                   <th className="text-left px-4 py-2 border-b">In/ut</th>
//                   <th className="text-left px-4 py-2 border-b">Enhet</th>
//                   {isManager && (
//                     <th className="text-left px-4 py-2 border-b">Åtgärder</th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {userList.map((user, i) => (
//                   <tr
//                     key={user._id}
//                     className={`${
//                       i % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     } hover:bg-gray-100 transition`}>
//                     <td className="px-4 py-2 border-b">{user.name}</td>
//                     <td className="px-4 py-2 border-b">{user.email}</td>
//                     <td className="px-4 py-2 border-b">{user.phone}</td>
//                     <td className="px-4 py-2 border-b">
//                       {user.role?.map((r, i) => (
//                         <span key={i} className="block">
//                           {r}
//                         </span>
//                       ))}
//                     </td>
//                     <td className="px-4 py-2 border-b">
//                       {user?.lastFour || "-"}
//                     </td>
//                     <td className="px-4 py-2 border-b">
//                       {user.unit?.name || "-"}
//                     </td>

//                     {currentUser && isManager && (
//                       <td className="px-4 py-2 border-b">
//                         <div className="flex items-center gap-2">
//                           <Link
//                             href={`/dashboard/users/${user._id}/edit`}
//                             className="p-2 border border-gray-300 rounded
//                             >

//                       hover:bg-gray-100 transition"
//                             title="Uppdatera">
//                             <HiOutlinePencil className="text-gray-600 w-5 h-5" />
//                           </Link>
//                           <button
//                             onClick={() => deleteHandler(user._id)}
//                             className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
//                             title="Ta bort">
//                             <HiOutlineTrash className="text-gray-600 w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserPage;

"use client";

import { useFetchUsers } from "@/customhook/useFetchUsers";
import { HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchUser from "@/components/users/searchUser";
import LoadingPage from "@/app/loading";
import { deleteUser } from "@/backend/userAPI";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import CustomAlert from "@/helper/customAlert";

export default function UserPage() {
  const { users, loading, error } = useFetchUsers();
  const { currentUser } = useFetchCurrentUser();
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // ✅ alert state

  // ✅ Uppdatera listan när data laddats
  useEffect(() => {
    if (users && users.length > 0) {
      setUserList(users);
    }
  }, [users]);

  // ✅ Bekräftad radering
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser._id);
      displaySuccessMessage("Användaren har tagits bort");
      setUserList((prev) => prev.filter((u) => u._id !== selectedUser._id));
    } catch (error) {
      displayErrorMessage("Fel vid borttagning av användare");
    } finally {
      setSelectedUser(null); // stäng alerten
    }
  };

  // ✅ Avbryt radering
  const handleCancelDelete = () => {
    setSelectedUser(null);
  };

  // ✅ Kontrollera chef-roller
  const isManager =
    currentUser?.role?.includes("Avdelningschef") ||
    currentUser?.role?.includes("Områdeschef");

  return (
    <div className="p-6">
      <h1 className="text-2xl text-blue-500 mb-6">Användaröversikt</h1>

      {/* Navigeringslänkar */}
      <div className="flex gap-x-6">
        <div className="hover:underline">
          {userList && (
            <Link
              className="flex items-center gap-1 text-blue-800 hover:text-blue-900"
              href={"/dashboard/timeReporting"}>
              <FontAwesomeIcon icon={faClockFour} className="h-5 w-5" />
              Närvaro och tider
            </Link>
          )}
        </div>

        {isManager && (
          <div className="hover:underline">
            <Link
              href="/dashboard/users/create"
              className="flex items-center gap-1 text-green-800 hover:text-green-900">
              <HiOutlinePlus className="w-5 h-5" />
              Ny användare
            </Link>
          </div>
        )}
      </div>

      {/* Sökfält */}
      <div className="hidden md:block mt-6">
        <SearchUser />
      </div>

      {/* Laddning & fel */}
      {loading && <LoadingPage message="Hämtar alla användare..." />}
      {error && (
        <p className="text-red-600">Fel vid hämtning: {error.message}</p>
      )}

      {!loading && !error && userList?.length === 0 && (
        <p>Inga användare hittades.</p>
      )}

      {/* Tabell med användare */}
      {!loading && !error && userList?.length > 0 && (
        <div
          className={`${
            userList.length > 15 ? "max-h-[400px] overflow-y-auto" : ""
          }`}>
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-50 text-xs sticky top-0 z-10">
                <tr>
                  <th className="text-left px-4 py-2 border-b">Namn</th>
                  <th className="text-left px-4 py-2 border-b">E-post</th>
                  <th className="text-left px-4 py-2 border-b">Telefon</th>
                  <th className="text-left px-4 py-2 border-b">Roll</th>
                  <th className="text-left px-4 py-2 border-b">In/ut</th>
                  <th className="text-left px-4 py-2 border-b">Enhet</th>
                  {isManager && (
                    <th className="text-left px-4 py-2 border-b">Åtgärder</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {userList.map((user, i) => (
                  <tr
                    key={user._id}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}>
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
                      {user?.lastFour || "-"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {user.unit?.name || "-"}
                    </td>

                    {isManager && (
                      <td className="px-4 py-2 border-b">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/users/${user._id}/edit`}
                            className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                            title="Uppdatera">
                            <HiOutlinePencil className="text-gray-600 w-5 h-5" />
                          </Link>

                          <button
                            onClick={() => setSelectedUser(user)} // 👈 öppna alert
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
        </div>
      )}

      {/* ✅ CustomAlert för bekräftelse */}
      {selectedUser && (
        <CustomAlert
          message={`Vill du ta bort ${selectedUser.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
