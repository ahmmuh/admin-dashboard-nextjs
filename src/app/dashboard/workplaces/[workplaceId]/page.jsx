// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faEdit,
//   faTrash,
//   faUserPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   deleteWorkplace,
//   getAllWorkPlaces,
//   assignUserToWorkPlace,
// } from "@/backend/workplaceAPI";
// import { getAllUsers } from "@/backend/allUsersAPI";

// function WorkPlacePage() {
//   const [workplaces, setWorkplaces] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Hämta arbetsplatser och användare
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const wpData = await getAllWorkPlaces();
//         const userData = await getAllUsers();

//         setWorkplaces(wpData || []);
//         setUsers(userData || []);
//       } catch (err) {
//         setError("Något gick fel vid hämtning.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm("Är du säker på att du vill ta bort denna arbetsplats?"))
//       return;

//     try {
//       await deleteWorkplace(id); // Anpassa beroende på om du behöver unitId också
//       setWorkplaces((prev) => prev.filter((wp) => wp._id !== id));
//     } catch (err) {
//       console.error("Error deleting workplace:", err.message);
//       alert("Kunde inte ta bort arbetsplatsen.");
//     }
//   };

//   const handleSelectUser = (workplaceId, userId) => {
//     setSelectedUsers((prev) => ({ ...prev, [workplaceId]: userId }));
//   };

//   const handleAssignUser = async (workplaceId) => {
//     const userId = selectedUsers[workplaceId];
//     if (!userId) return alert("Välj en användare först!");

//     try {
//       const result = await assignUserToWorkPlace(workplaceId, userId);
//       if (result) {
//         alert("Användare tilldelad!");
//         // Uppdatera lokalt workplaces state med ny användare
//         setWorkplaces((prev) =>
//           prev.map((wp) =>
//             wp._id === workplaceId
//               ? { ...wp, cleaners: [...(wp.cleaners || []), result.user] }
//               : wp
//           )
//         );
//         setSelectedUsers((prev) => ({ ...prev, [workplaceId]: "" }));
//       }
//     } catch (err) {
//       console.error("Error assigning user:", err.message);
//       alert("Kunde inte tilldela användare.");
//     }
//   };

//   if (loading) return <p>Laddar arbetsplatser...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col px-6 py-4 gap-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold text-blue-700">Arbetsplatser</h2>
//         <Link
//           href="/workplaces/create"
//           className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 flex items-center gap-2">
//           <FontAwesomeIcon icon={faPlus} /> Skapa arbetsplats
//         </Link>
//       </div>

//       {workplaces.length > 0 ? (
//         <div className="flex flex-col gap-4">
//           {workplaces.map((wp) => (
//             <div
//               key={wp._id}
//               className="bg-gray-100 p-5 rounded-2xl shadow hover:shadow-lg transition flex flex-col gap-3">
//               <h3 className="text-2xl font-semibold text-blue-900">
//                 {wp.name}
//               </h3>
//               <p className="text-gray-700">
//                 <strong>Adress:</strong> {wp.address}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Koordinater:</strong>{" "}
//                 {wp.location?.coordinates?.join(", ")}
//               </p>

//               <div className="flex items-center gap-2">
//                 <select
//                   className="border rounded px-2 py-1"
//                   value={selectedUsers[wp._id] || ""}
//                   onChange={(e) => handleSelectUser(wp._id, e.target.value)}>
//                   <option value="">Välj användare</option>
//                   {users.map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.name}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={() => handleAssignUser(wp._id)}
//                   className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 flex items-center gap-2">
//                   <FontAwesomeIcon icon={faUserPlus} /> Tilldela
//                 </button>
//               </div>

//               <div className="flex gap-4 mt-3">
//                 <Link
//                   href={`/workplaces/${wp._id}/edit`}
//                   className="bg-yellow-500 text-white px-3 py-2 rounded-lg shadow hover:bg-yellow-600 flex items-center gap-2">
//                   <FontAwesomeIcon icon={faEdit} /> Redigera
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(wp._id)}
//                   className="bg-red-600 text-white px-3 py-2 rounded-lg shadow hover:bg-red-700 flex items-center gap-2">
//                   <FontAwesomeIcon icon={faTrash} /> Ta bort
//                 </button>
//               </div>

//               {wp.cleaners && wp.cleaners.length > 0 && (
//                 <p className="text-gray-700 mt-2">
//                   <strong>Tilldelade användare:</strong>{" "}
//                   {wp.cleaners.map((c) => c.name || c).join(", ")}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Inga arbetsplatser tillagda än.</p>
//       )}
//     </div>
//   );
// }

// export default WorkPlacePage;
