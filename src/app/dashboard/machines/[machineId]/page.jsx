// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import LoadingPage from "@/app/loading";
// import {
//   borrow,
//   returnBack,
//   useFetchMachines,
// } from "@/customhook/useFetchMachine";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";

// export default function MachineDetailPage() {
//   const { machineId } = useParams();
//   const { machines, loading: machinesLoading } = useFetchMachines();
//   const { currentUser, loading: userLoading } = useFetchCurrentUser();
//   const [machine, setMachine] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);

//   useEffect(() => {
//     if (!machinesLoading && machines) {
//       const found = machines.find((m) => m._id === machineId);
//       setMachine(found || null);
//     }
//   }, [machines, machinesLoading, machineId]);

//   if (machinesLoading || userLoading)
//     return <LoadingPage message="Hämtar maskindetaljer..." />;
//   if (!machine)
//     return <p className="text-red-500">❌ Ingen maskin hittades.</p>;

//   const handleBorrow = async () => {
//     if (!currentUser) return;

//     if (!machine.isAvailable && currentUser.role !== "admin") {
//       displayErrorMessage(
//         "Endast chef kan låna ut maskiner som redan är utlånade!"
//       );
//       return;
//     }

//     setActionLoading(true);
//     try {
//       const updated = await borrow(machine._id, currentUser._id);
//       if (updated) setMachine(updated);
//       displaySuccessMessage("Maskin utlånad ✅");
//     } catch (err) {
//       displayErrorMessage("Kunde inte låna ut maskinen ❌");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReturn = async () => {
//     setActionLoading(true);
//     try {
//       const updated = await returnBack(machine._id);
//       if (updated) setMachine(updated);
//       displaySuccessMessage("Maskin återlämnad ✅");
//     } catch (err) {
//       displayErrorMessage("Kunde inte återlämna maskinen ❌");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <div className="bg-gray-50 shadow-sm rounded-lg p-6 space-y-5 border border-gray-200">
//         <h1 className="text-2xl font-semibold text-gray-800">{machine.name}</h1>

//         <p>
//           <span className="font-medium text-gray-700">Enhet:</span>{" "}
//           <span className="text-gray-600">{machine.unitId?.name || "-"}</span>
//         </p>

//         <p>
//           <span className="font-medium text-gray-700">Status:</span>{" "}
//           {machine.isAvailable ? (
//             <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
//               Tillgänglig
//             </span>
//           ) : (
//             <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
//               Utlånad
//             </span>
//           )}
//         </p>

//         {/* QR-kod direkt under status */}
//         {machine.qrCode && (
//           <div className="flex flex-col items-center gap-2 mt-2">
//             <img
//               src={machine.qrCode}
//               alt={machine.name}
//               className="w-32 h-32 border rounded"
//             />
//             <a
//               href={machine.qrCode}
//               download={`${machine.name}_QR.png`}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm">
//               Ladda ner QR
//             </a>
//           </div>
//         )}

//         {/* Knappar */}
//         <div className="flex gap-4 mt-4">
//           {machine.isAvailable ? (
//             <button
//               onClick={handleBorrow}
//               disabled={actionLoading}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
//               Låna ut
//             </button>
//           ) : currentUser?.role === "admin" ? (
//             <button
//               onClick={handleBorrow}
//               disabled={actionLoading}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
//               Låna ut (undantag)
//             </button>
//           ) : (
//             <button
//               onClick={handleReturn}
//               disabled={actionLoading}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
//               Lämna in
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";

export default function MachineDetailPage() {
  const router = useRouter();
  const { machineId } = useParams();
  const {
    machines,
    loading: machinesLoading,
    borrow,
    returnBack,
  } = useFetchMachines();
  const { currentUser, loading: userLoading } = useFetchCurrentUser();
  const [machine, setMachine] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Hitta maskinen när maskiner hämtats
  useEffect(() => {
    if (!machinesLoading && machines) {
      const found = machines.find((m) => m._id === machineId);
      setMachine(found || null);
    }
  }, [machines, machinesLoading, machineId]);

  if (machinesLoading || userLoading)
    return <LoadingPage message="Hämtar maskindetaljer..." />;

  if (!machine)
    return (
      <p className="text-red-500 text-center mt-10">
        ❌ Ingen maskin hittades.
      </p>
    );

  // Låna ut maskin
  const handleBorrow = async () => {
    if (!currentUser) return;

    if (!machine.isAvailable && currentUser.role !== "admin") {
      displayErrorMessage(
        "Endast chef kan låna ut maskiner som redan är utlånade!"
      );
      router.push("/dashboard/machines");

      return;
    }

    setActionLoading(true);
    try {
      const result = await borrow(machine._id, currentUser._id);
      if (result?.machine) setMachine(result.machine);
      displaySuccessMessage("Maskin utlånad ✅");
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte låna ut maskinen ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // Lämna tillbaka maskin
  const handleReturn = async () => {
    setActionLoading(true);
    try {
      const result = await returnBack(machine._id);
      if (result?.machine) setMachine(result.machine);
      displaySuccessMessage("Maskin återlämnad ✅");
      router.push("/dashboard/machines");
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte återlämna maskinen ❌");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 space-y-5 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">{machine.name}</h1>

        <p>
          {/* <span className="font-medium text-gray-700">Enhet:</span>{" "} */}
          <span className="text-gray-600">{machine.unitId?.name || "-"}</span>
        </p>

        <p>
          <span className="font-medium text-gray-700">Status:</span>{" "}
          {machine.isAvailable ? (
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
              Tillgänglig
            </span>
          ) : (
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
              Utlånad
            </span>
          )}
        </p>

        {/* QR-kod under status */}
        {machine.qrCode && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <img
              src={machine.qrCode}
              alt={machine.name}
              className="w-32 h-32 border rounded"
            />
            <a
              href={machine.qrCode}
              download={`${machine.name}_QR.png`}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm">
              Ladda ner QR
            </a>
          </div>
        )}

        {/* Låna ut / Lämna in knappar */}
        <div className="flex gap-4 mt-4">
          {machine.isAvailable ? (
            <button
              onClick={handleBorrow}
              disabled={actionLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
              Låna ut
            </button>
          ) : currentUser?.role === "admin" ? (
            <button
              onClick={handleBorrow}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Låna ut (undantag)
            </button>
          ) : (
            <button
              onClick={handleReturn}
              disabled={actionLoading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Lämna in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
