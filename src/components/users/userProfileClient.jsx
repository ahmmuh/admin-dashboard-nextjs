// "use client";

// import { useFetchUsers } from "@/customhook/useFetchUsers";
// import {
//   HiOutlinePencil,
//   HiOutlineRefresh,
//   HiOutlineTrash,
// } from "react-icons/hi";
// import React from "react";
// import Link from "next/link";
// import LoadingPage from "@/app/loading";

// function UserProfileClientComponent() {
//   const { users, loading, error, refetch } = useFetchUsers();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Användaröversikt </h1>

//       {loading && <LoadingPage message="Vi hämtar din profil..." />}
//       {error && (
//         <p className="text-red-600">Fel vid hämtning: {error.message}</p>
//       )}

//       {!loading && !error && users?.length === 0 && (
//         <p>Inga användare hittades.</p>
//       )}

//       {!loading && !error && users?.length > 0 && (
//         <table className="w-full border border-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left px-4 py-2 border-b">Namn</th>
//               <th className="text-left px-4 py-2 border-b">E-post</th>
//               <th className="text-left px-4 py-2 border-b">Telefon</th>
//               <th className="text-left px-4 py-2 border-b">Roll</th>
//               <th className="text-left px-4 py-2 border-b">Enhet</th>
//               <th className="text-left px-4 py-2 border-b">Åtgärder</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users &&
//               users?.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border-b">{user.name}</td>
//                   <td className="px-4 py-2 border-b">{user.email}</td>
//                   <td className="px-4 py-2 border-b">{user.phone}</td>
//                   <td className="px-4 py-2 border-b">
//                     {user.role?.map((r, i) => (
//                       <span key={i} className="block">
//                         {r}
//                       </span>
//                     ))}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {user.unit?.name || "-"}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <div className="flex items-center gap-2">
//                       <Link
//                         href={"/dashboard/users/" + user._id + "/edit"}
//                         className="p-2 border border-gray-300 rounded
//                             >

//                       hover:bg-gray-100 transition"
//                         title="Uppdatera">
//                         <HiOutlinePencil className="text-gray-600 w-5 h-5" />
//                       </Link>
//                       <button
//                         onClick={() => alert("Vill du ta bort? ", user.id)}
//                         className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
//                         title="Ta bort">
//                         <HiOutlineTrash className="text-gray-600 w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default UserProfileClientComponent;

"use client";

import { useState } from "react";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import CustomAlert from "@/components/CustomAlert"; // 👈 importera din alert-komponent

function UserProfileClientComponent() {
  const { users, loading, error, refetch } = useFetchUsers();

  // 🔹 State för alert
  const [selectedUser, setSelectedUser] = useState(null);

  // 🔹 Funktioner
  const handleConfirmDelete = async () => {
    console.log("Ta bort användare:", selectedUser._id);
    // TODO: Lägg in API-anrop här t.ex. await deleteUser(selectedUser._id)
    setSelectedUser(null);
    refetch(); // uppdatera listan om du vill
  };

  const handleCancelDelete = () => {
    console.log("Radering avbruten.");
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Användaröversikt</h1>

      {loading && <LoadingPage message="Vi hämtar din profil..." />}
      {error && (
        <p className="text-red-600">Fel vid hämtning: {error.message}</p>
      )}
      {!loading && !error && users?.length === 0 && (
        <p>Inga användare hittades.</p>
      )}

      {!loading && !error && users?.length > 0 && (
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2 border-b">Namn</th>
              <th className="text-left px-4 py-2 border-b">E-post</th>
              <th className="text-left px-4 py-2 border-b">Telefon</th>
              <th className="text-left px-4 py-2 border-b">Roll</th>
              <th className="text-left px-4 py-2 border-b">Enhet</th>
              <th className="text-left px-4 py-2 border-b">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
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
                <td className="px-4 py-2 border-b">{user.unit?.name || "-"}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/users/${user._id}/edit`}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                      title="Uppdatera">
                      <HiOutlinePencil className="text-gray-600 w-5 h-5" />
                    </Link>

                    <button
                      onClick={() => setSelectedUser(user)} // 👈 Visa alerten
                      className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                      title="Ta bort">
                      <HiOutlineTrash className="text-gray-600 w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Visa CustomAlert om användare är vald */}
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

export default UserProfileClientComponent;
