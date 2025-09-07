// "use client";
// import LoadingPage from "@/app/loading";
// import { getKeyLogs } from "@/backend/keyAPI";
// import KeySearch from "@/components/keys/keySearch";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { useFetchKeys } from "@/customhook/useFetchKeys";
// import { useFetchUsers } from "@/customhook/useFetchUsers";
// import React, { useEffect, useState } from "react";

// function KeyLogPage() {
//   const [logs, setLogs] = useState([]);
//   const { users } = useFetchUsers();
//   const { keys } = useFetchKeys();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleLogs, setVisibleLogs] = useState(15);

//   const { currentUser } = useFetchCurrentUser();

//   async function fetchLogs() {
//     try {
//       const logData = await getKeyLogs();
//       setLogs(Array.isArray(logData) ? logData : []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error vid hämtning av KEY LOGS");
//       setLoading(false);
//       setError(error);
//     }
//   }

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   if (loading) return <LoadingPage message="Vi hämtar nyckelhistorik..." />;
//   if (error) return <div className="p-10 bg-red-600 text-white">Error</div>;
//   if (!logs.length)
//     return <div className="text-green-700 p-5">Inga loggar finns att visa</div>;

//   // Process logs: separera varje händelse (utlånad och inlämnad)
//   const processedLogs = [];
//   logs.forEach((log) => {
//     if (!log.key) return;

//     // Utlånad
//     if (log.key.borrowedAt) {
//       processedLogs.push({
//         keyLabel: log.key.keyLabel,
//         location: log.key.location,
//         borrower: log.key.borrowedBy?.name || "-",
//         date: log.key.borrowedAt,
//         status: "Utlånad",
//       });
//     }

//     // Inlämnad
//     if (log.key.returnedAt) {
//       processedLogs.push({
//         keyLabel: log.key.keyLabel,
//         location: log.key.location,
//         borrower: log.key.lastBorrowedBy?.name || "-",
//         date: log.key.returnedAt,
//         status: "Inlämnad",
//       });
//     }
//   });

//   // Ta bort exakta dubletter (samma keyLabel, status, datum, borrower)
//   const uniqueLogs = processedLogs.filter(
//     (log, index, self) =>
//       index ===
//       self.findIndex(
//         (l) =>
//           l.keyLabel === log.keyLabel &&
//           l.status === log.status &&
//           l.date === log.date &&
//           l.borrower === log.borrower
//       )
//   );

//   return (
//     <>
//       <div className="hidden md:block mr-5 mt-3">
//         <h3 className="text-2xl text-blue-500 mb-4">Nyckelhistorik</h3>
//         <KeySearch />
//       </div>
//       <div className="pb-20">
//         <table className="border border-gray-200 w-full">
//           <thead>
//             <tr>
//               <th className="border text-left">Nyckelbeteckning</th>
//               <th className="border text-left">Plats</th>
//               <th className="border text-left">Lånetagare</th>
//               <th className="border text-left">Utlånat datum</th>
//               <th className="border text-left">Inlämnat datum</th>
//               <th className="border text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {uniqueLogs.slice(0, visibleLogs)?.map((log, index) => {
//               const borrowedAt =
//                 log.status === "Utlånad"
//                   ? new Date(log.date).toLocaleDateString()
//                   : "-";
//               const returnedAt =
//                 log.status === "Inlämnad"
//                   ? new Date(log.date).toLocaleDateString()
//                   : "-";

//               return (
//                 <tr key={index} className="hover:bg-gray-200">
//                   <td className="border p-1">🔑 {log.keyLabel}</td>
//                   <td className="border p-1">{log.location || "-"}</td>
//                   <td className="border p-1">{log.borrower}</td>
//                   <td className="border p-1">{borrowedAt}</td>
//                   <td className="border p-1">{returnedAt}</td>
//                   <td className="border p-1">{log.status}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {visibleLogs < uniqueLogs.length && (
//           <button
//             className="bg-red-100 p-2 my-4"
//             onClick={() => setVisibleLogs(visibleLogs + 10)}>
//             Visa fler
//           </button>
//         )}
//       </div>
//     </>
//   );
// }

// export default KeyLogPage;

// "use client";
// import LoadingPage from "@/app/loading";
// import { getKeyLogs } from "@/backend/keyAPI";
// import KeySearch from "@/components/keys/keySearch";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { useFetchKeys } from "@/customhook/useFetchKeys";
// import { useFetchUsers } from "@/customhook/useFetchUsers";
// import React, { useEffect, useState } from "react";

// function KeyLogPage() {
//   const [logs, setLogs] = useState([]);
//   const { users } = useFetchUsers();
//   const { keys } = useFetchKeys();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleLogs, setVisibleLogs] = useState(15);

//   const { currentUser } = useFetchCurrentUser();

//   async function fetchLogs() {
//     try {
//       const logData = await getKeyLogs();
//       setLogs(Array.isArray(logData) ? logData : []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error vid hämtning av KEY LOGS");
//       setLoading(false);
//       setError(error);
//     }
//   }

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   if (loading) return <LoadingPage message="Vi hämtar nyckelhistorik..." />;
//   if (error) return <div className="p-10 bg-red-600 text-white">Error</div>;
//   if (!logs.length)
//     return <div className="text-green-700 p-5">Inga loggar finns att visa</div>;

//   // Process logs: separera varje händelse (utlånad och inlämnad)
//   const processedLogs = [];
//   logs.forEach((log) => {
//     if (!log.key) return;

//     // Utlånad
//     if (log.key.borrowedAt) {
//       processedLogs.push({
//         keyLabel: log.key.keyLabel,
//         unit: log.key.unit?.name || "-", // uppdaterat från location
//         borrower: log.key.borrowedBy?.name || "-",
//         date: log.key.borrowedAt,
//         status: "Utlånad",
//       });
//     }

//     // Inlämnad
//     if (log.key.returnedAt) {
//       processedLogs.push({
//         keyLabel: log.key.keyLabel,
//         unit: log.key.unit?.name || "-", // uppdaterat från location
//         borrower: log.key.lastBorrowedBy?.name || "-",
//         date: log.key.returnedAt,
//         status: "Inlämnad",
//       });
//     }
//   });

//   // Ta bort exakta dubletter (samma keyLabel, status, datum, borrower)
//   const uniqueLogs = processedLogs.filter(
//     (log, index, self) =>
//       index ===
//       self.findIndex(
//         (l) =>
//           l.keyLabel === log.keyLabel &&
//           l.status === log.status &&
//           l.date === log.date &&
//           l.borrower === log.borrower
//       )
//   );

//   return (
//     <>
//       <div className="hidden md:block mr-5 mt-3">
//         <h3 className="text-2xl text-blue-500 mb-4">Nyckelhistorik</h3>
//         <KeySearch />
//       </div>
//       <div className="pb-20">
//         <table className="border border-gray-200 w-full">
//           <thead>
//             <tr>
//               <th className="border text-left">Nyckelbeteckning</th>
//               <th className="border text-left">Enhet</th>
//               <th className="border text-left">Lånetagare</th>
//               <th className="border text-left">Utlånat datum</th>
//               <th className="border text-left">Inlämnat datum</th>
//               <th className="border text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {uniqueLogs.slice(0, visibleLogs)?.map((log, index) => {
//               const borrowedAt =
//                 log.status === "Utlånad"
//                   ? new Date(log.date).toLocaleDateString()
//                   : "-";
//               const returnedAt =
//                 log.status === "Inlämnad"
//                   ? new Date(log.date).toLocaleDateString()
//                   : "-";

//               return (
//                 <tr key={index} className="hover:bg-gray-200">
//                   <td className="border p-1">🔑 {log.keyLabel}</td>
//                   <td className="border p-1">{log.unit || "-"}</td>{" "}
//                   {/* uppdaterat */}
//                   <td className="border p-1">{log.borrower}</td>
//                   <td className="border p-1">{borrowedAt}</td>
//                   <td className="border p-1">{returnedAt}</td>
//                   <td className="border p-1">{log.status}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {visibleLogs < uniqueLogs.length && (
//           <button
//             className="bg-red-100 p-2 my-4"
//             onClick={() => setVisibleLogs(visibleLogs + 10)}>
//             Visa fler
//           </button>
//         )}
//       </div>
//     </>
//   );
// }

// export default KeyLogPage;

"use client";
import LoadingPage from "@/app/loading";
import { getKeyLogs } from "@/backend/keyAPI";
import KeySearch from "@/components/keys/keySearch";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { useFetchKeys } from "@/customhook/useFetchKeys";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import React, { useEffect, useState } from "react";

function KeyLogPage() {
  const [logs, setLogs] = useState([]);
  const { users } = useFetchUsers();
  const { keys } = useFetchKeys();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleLogs, setVisibleLogs] = useState(15);

  const { currentUser } = useFetchCurrentUser();

  async function fetchLogs() {
    try {
      const logData = await getKeyLogs();
      setLogs(Array.isArray(logData) ? logData : []);
      setLoading(false);
    } catch (error) {
      console.error("Error vid hämtning av KEY LOGS");
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) return <LoadingPage message="Vi hämtar nyckelhistorik..." />;
  if (error) return <div className="p-10 bg-red-600 text-white">Error</div>;
  if (!logs.length)
    return (
      <div className="font-semibold p-5">
        Det finns ingen nyckelhistorik att visa
      </div>
    );

  // Process logs: separera varje händelse (utlånad och inlämnad)
  const processedLogs = [];
  logs.forEach((log) => {
    if (!log.key) return;

    // Utlånad
    if (log.key.borrowedAt) {
      processedLogs.push({
        keyLabel: log.key.keyLabel,
        unit: log.key.unit?.name || "-", // uppdaterat från location
        borrower: log.key.borrowedBy?.name || "-",
        date: log.key.borrowedAt,
        status: "Utlånad",
      });
    }

    // Inlämnad
    if (log.key.returnedAt) {
      processedLogs.push({
        keyLabel: log.key.keyLabel,
        unit: log.key.unit?.name || "-", // uppdaterat från location
        borrower: log.key.lastBorrowedBy?.name || "-",
        date: log.key.returnedAt,
        status: "Inlämnad",
      });
    }
  });

  // Ta bort exakta dubletter (samma keyLabel, status, datum, borrower)
  const uniqueLogs = processedLogs.filter(
    (log, index, self) =>
      index ===
      self.findIndex(
        (l) =>
          l.keyLabel === log.keyLabel &&
          l.status === log.status &&
          l.date === log.date &&
          l.borrower === log.borrower
      )
  );

  return (
    <>
      <div className="hidden md:block mr-5 mt-3">
        <h3 className="text-2xl text-blue-500 mb-4">Nyckelhistorik</h3>
        <KeySearch />
      </div>
      <div className="pb-20">
        {uniqueLogs.length > 0 ? (
          <table className="border border-gray-200 w-full">
            <thead>
              <tr>
                <th className="border text-left">Nyckelbeteckning</th>
                <th className="border text-left">Enhet</th>
                <th className="border text-left">Lånetagare</th>
                <th className="border text-left">Utlånat datum</th>
                <th className="border text-left">Inlämnat datum</th>
                <th className="border text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {uniqueLogs.slice(0, visibleLogs)?.map((log, index) => {
                const borrowedAt =
                  log.status === "Utlånad"
                    ? new Date(log.borrowedAt).toLocaleString()
                    : "-";
                const returnedAt =
                  log.status === "Inlämnad"
                    ? new Date(log.returnedAt).toLocaleString()
                    : "-";

                return (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className="border p-1">🔑 {log.keyLabel}</td>
                    <td className="border p-1">{log.unit || "-"}</td>
                    <td className="border p-1">{log.borrower}</td>
                    <td className="border p-1">
                      {borrowedAt
                        ? new Date(borrowedAt).toLocaleString("sv-SE")
                        : "_"}
                    </td>
                    <td className="border p-1">
                      {returnedAt
                        ? new Date(returnedAt).toLocaleString("sv-SE")
                        : "_"}
                    </td>
                    <td className="border p-1">{log.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="font-semibold p-5">
            Det finns ingen nyckelhistorik att visa just nu
          </div>
        )}
        {visibleLogs < uniqueLogs.length && (
          <button
            className="bg-red-100 p-2 my-4"
            onClick={() => setVisibleLogs(visibleLogs + 10)}>
            Visa fler
          </button>
        )}
      </div>
    </>
  );
}

export default KeyLogPage;
