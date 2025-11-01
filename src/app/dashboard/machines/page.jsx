// //KOD MED QR + ÅTGÄRDAR
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useFetchMachines } from "@/customhook/useFetchMachine";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import LoadingPage from "@/app/loading";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import { HiPlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

// export default function MachinePage() {
//   const router = useRouter();
//   const { machines, loading, error, removeMachine } = useFetchMachines();
//   const { currentUser, loading: currentUserLoading } = useFetchCurrentUser();

//   const [searchType, setSearchType] = useState("");
//   const [selectedUnit, setSelectedUnit] = useState("");
//   const [showQR, setShowQR] = useState({});

//   if (loading || currentUserLoading)
//     return <LoadingPage message="Hämtar maskiner..." />;

//   if (error)
//     return (
//       <p className="text-red-500">
//         Fel vid hämtning av maskiner: {error.message}
//       </p>
//     );

//   const roles = currentUser.role;

//   const uniqueUnits = Array.from(
//     new Set(machines.map((m) => m.unitId?.name).filter(Boolean))
//   );

//   const filteredMachines = machines.filter((m) => {
//     const matchType = m.name
//       ?.toLowerCase()
//       .includes(searchType.toLowerCase().trim());
//     const matchUnit = selectedUnit ? m.unitId?.name === selectedUnit : true;
//     return matchType && matchUnit;
//   });

//   const handleDelete = async (id) => {
//     if (!confirm("Är du säker på att du vill ta bort denna maskin?")) return;
//     try {
//       await removeMachine(id);
//       displaySuccessMessage("Maskin borttagen ✅");
//     } catch (err) {
//       displayErrorMessage("Kunde inte ta bort maskinen ❌");
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
//         <h1 className="text-2xl text-blue-500 font-semibold">
//           Maskiner på alla enheter
//         </h1>
//         <div className="flex flex-wrap gap-2 sm:gap-3">
//           <Link
//             href={"/dashboard/machineLogs"}
//             className="text-gray-600 flex items-center gap-1 text-sm sm:text-base hover:underline">
//             <FontAwesomeIcon icon={faCalendar} /> Maskin historik
//           </Link>
//           <Link
//             className="text-green-800 flex items-center gap-1 text-sm sm:text-base"
//             href="/dashboard/machines/create">
//             <HiPlus className="w-5 h-5" />
//             <span>Lägg till ny maskin</span>
//           </Link>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
//         <input
//           type="text"
//           placeholder="Sök maskintyp..."
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//           className="border border-gray-300 rounded px-2 py-1 w-full sm:w-1/2 text-sm focus:ring-2 focus:ring-blue-400"
//         />
//         <select
//           value={selectedUnit}
//           onChange={(e) => setSelectedUnit(e.target.value)}
//           className="border border-gray-300 rounded px-2 py-1 w-full sm:w-1/3 text-sm focus:ring-2 focus:ring-blue-400">
//           <option value="">Alla enheter</option>
//           {uniqueUnits.map((unit) => (
//             <option key={unit} value={unit}>
//               {unit}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredMachines.length === 0 ? (
//         <p className="text-red-500 text-center text-lg font-semibold mt-10">
//           Det finns inga maskiner att visa just nu.
//         </p>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-200 max-h-[600px]">
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0 z-10">
//               <tr>
//                 <th className="px-2 py-1">Maskintyp</th>
//                 <th className="px-2 py-1">Enhet</th>
//                 <th className="px-2 py-1">Status</th>
//                 <th className="px-2 py-1">Lånad av</th>
//                 <th className="px-2 py-1">Utlånad datum</th>
//                 <th className="px-2 py-1">Inlämnad datum</th>
//                 <th className="px-2 py-1 text-center">Åtgärder</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMachines.map((m, i) => (
//                 <tr
//                   key={m._id}
//                   onClick={() => router.push(`/dashboard/machines/${m._id}`)}
//                   className={`${
//                     i % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   } hover:bg-blue-50 transition cursor-pointer text-sm`}>
//                   <td className="px-2 py-1 font-medium">{m.name}</td>
//                   <td className="px-2 py-1">{m.unitId?.name || "-"}</td>
//                   <td className="px-2 py-1">
//                     {m.isAvailable ? (
//                       <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-xs">
//                         Tillgänglig
//                       </span>
//                     ) : (
//                       <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded text-xs">
//                         Utlånad
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-2 py-1">{m.borrowedBy?.name || "-"}</td>
//                   <td className="px-2 py-1">
//                     {m.borrowedDate
//                       ? new Date(m.borrowedDate).toLocaleDateString("sv-SE")
//                       : "-"}
//                   </td>
//                   <td className="px-2 py-1">
//                     {m.returnedDate
//                       ? new Date(m.returnedDate).toLocaleDateString("sv-SE")
//                       : "-"}
//                   </td>
//                   <td className="px-2 py-1 text-center">
//                     <div className="flex flex-col items-center gap-1">
//                       {(roles.includes("Avdelningschef") ||
//                         roles.includes("Områdeschef") ||
//                         (roles.includes("Enhetschef") &&
//                           m.unitId?._id === currentUser.unit?._id)) && (
//                         <Link
//                           href={`/dashboard/machines/${m._id}/edit`}
//                           onClick={(e) => e.stopPropagation()}
//                           className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition"
//                           title="Redigera">
//                           <HiOutlinePencil className="w-4 h-4 text-gray-600" />
//                         </Link>
//                       )}

//                       {(roles.includes("Avdelningschef") ||
//                         roles.includes("Områdeschef")) && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(m._id);
//                           }}
//                           className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition"
//                           title="Ta bort">
//                           <HiOutlineTrash className="w-4 h-4 text-gray-600" />
//                         </button>
//                       )}

//                       {m.qrCode && (
//                         <>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setShowQR((prev) => ({
//                                 ...prev,
//                                 [m._id]: !prev[m._id],
//                               }));
//                             }}
//                             className="px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-100 transition text-xs">
//                             {showQR[m._id] ? "Dölj QR" : "Visa QR"}
//                           </button>
//                           {showQR[m._id] && (
//                             <div className="mt-1 flex flex-col items-center">
//                               <img
//                                 src={m.qrCode}
//                                 alt={`QR för ${m.name}`}
//                                 className="w-16 h-16 object-contain"
//                               />
//                               <a
//                                 href={m.qrCode}
//                                 download={`${m.name}_QR.png`}
//                                 className="text-xs text-blue-600 underline mt-1">
//                                 Ladda ner
//                               </a>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// Ny kod med custom alert komponent
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "@/app/loading";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { HiPlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import CustomAlert from "@/helper/customAlert";

export default function MachinePage() {
  const router = useRouter();
  const { machines, loading, error, removeMachine } = useFetchMachines();
  const { currentUser, loading: currentUserLoading } = useFetchCurrentUser();

  const [searchType, setSearchType] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [showQR, setShowQR] = useState({});
  const [showAlert, setShowAlert] = useState(false); // 🔹 state för CustomAlert
  const [machineToDelete, setMachineToDelete] = useState(null); // 🔹 lagra maskin som ska tas bort

  if (loading || currentUserLoading)
    return <LoadingPage message="Hämtar maskiner..." />;

  if (error)
    return (
      <p className="text-red-500">
        Fel vid hämtning av maskiner: {error.message}
      </p>
    );

  const roles = currentUser.role;

  const uniqueUnits = Array.from(
    new Set(machines.map((m) => m.unitId?.name).filter(Boolean))
  );

  const filteredMachines = machines.filter((m) => {
    const matchType = m.name
      ?.toLowerCase()
      .includes(searchType.toLowerCase().trim());
    const matchUnit = selectedUnit ? m.unitId?.name === selectedUnit : true;
    return matchType && matchUnit;
  });

  // 🔹 Visa CustomAlert istället för confirm
  const handleDelete = (id) => {
    setMachineToDelete(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (!machineToDelete) return;
    try {
      await removeMachine(machineToDelete);
      displaySuccessMessage("Maskin borttagen ✅");
      setShowAlert(false);
      setMachineToDelete(null);
    } catch (err) {
      displayErrorMessage("Kunde inte ta bort maskinen ❌");
      setShowAlert(false);
      setMachineToDelete(null);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-2xl text-blue-500 font-semibold">
          Maskiner på alla enheter
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            href={"/dashboard/machineLogs"}
            className="text-gray-600 flex items-center gap-1 text-sm sm:text-base hover:underline">
            <FontAwesomeIcon icon={faCalendar} /> Maskin historik
          </Link>
          <Link
            className="text-green-800 flex items-center gap-1 text-sm sm:text-base"
            href="/dashboard/machines/create">
            <HiPlus className="w-5 h-5" />
            <span>Lägg till ny maskin</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Sök maskintyp..."
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-1/2 text-sm focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-1/3 text-sm focus:ring-2 focus:ring-blue-400">
          <option value="">Alla enheter</option>
          {uniqueUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {filteredMachines.length === 0 ? (
        <p className="text-red-500 text-center text-lg font-semibold mt-10">
          Det finns inga maskiner att visa just nu.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 max-h-[600px]">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0 z-10">
              <tr>
                <th className="px-2 py-1">Maskintyp</th>
                <th className="px-2 py-1">Enhet</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Lånad av</th>
                <th className="px-2 py-1">Utlånad datum</th>
                <th className="px-2 py-1">Inlämnad datum</th>
                <th className="px-2 py-1 text-center">Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachines.map((m, i) => (
                <tr
                  key={m._id}
                  onClick={() => router.push(`/dashboard/machines/${m._id}`)}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition cursor-pointer text-sm`}>
                  <td className="px-2 py-1 font-medium">{m.name}</td>
                  <td className="px-2 py-1">{m.unitId?.name || "-"}</td>
                  <td className="px-2 py-1">
                    {m.isAvailable ? (
                      <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-xs">
                        Tillgänglig
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded text-xs">
                        Utlånad
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-1">{m.borrowedBy?.name || "-"}</td>
                  <td className="px-2 py-1">
                    {m.borrowedDate
                      ? new Date(m.borrowedDate).toLocaleDateString("sv-SE")
                      : "-"}
                  </td>
                  <td className="px-2 py-1">
                    {m.returnedDate
                      ? new Date(m.returnedDate).toLocaleDateString("sv-SE")
                      : "-"}
                  </td>
                  <td className="px-2 py-1 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {(roles.includes("Avdelningschef") ||
                        roles.includes("Områdeschef") ||
                        (roles.includes("Enhetschef") &&
                          m.unitId?._id === currentUser.unit?._id)) && (
                        <Link
                          href={`/dashboard/machines/${m._id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                          title="Redigera">
                          <HiOutlinePencil className="w-4 h-4 text-gray-600" />
                        </Link>
                      )}

                      {(roles.includes("Avdelningschef") ||
                        roles.includes("Områdeschef")) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(m._id);
                          }}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                          title="Ta bort">
                          <HiOutlineTrash className="w-4 h-4 text-gray-600" />
                        </button>
                      )}

                      {m.qrCode && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowQR((prev) => ({
                                ...prev,
                                [m._id]: !prev[m._id],
                              }));
                            }}
                            className="px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-100 transition text-xs">
                            {showQR[m._id] ? "Dölj QR" : "Visa QR"}
                          </button>
                          {showQR[m._id] && (
                            <div className="mt-1 flex flex-col items-center">
                              <img
                                src={m.qrCode}
                                alt={`QR för ${m.name}`}
                                className="w-16 h-16 object-contain"
                              />
                              <a
                                href={m.qrCode}
                                download={`${m.name}_QR.png`}
                                className="text-xs text-blue-600 underline mt-1">
                                Ladda ner
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 CustomAlert */}
      {showAlert && machineToDelete && (
        <CustomAlert
          message={`Vill du ta bort maskinen?`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowAlert(false);
            setMachineToDelete(null);
          }}
        />
      )}
    </div>
  );
}
