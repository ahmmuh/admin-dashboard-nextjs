// "use client";

// import React, { useState } from "react";
// import LoadingPage from "@/app/loading";
// import { useFetchUsers } from "@/customhook/useFetchUsers";

// function TimeReportPage() {
//   const { users, loading, error } = useFetchUsers();
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   if (loading) return <LoadingPage message="Hämtar tidrapport" />;
//   if (error) return <p className="text-red-600">Fel: {error.message}</p>;
//   if (!users || users.length === 0) return <p>Inga användare hittades.</p>;

//   const selectedUser = users.find((user) => user._id === selectedUserId);

//   // Hjälpfunktion som tolkar datum lokalt (inte UTC)
//   const parseLocalDate = (dateStr) => {
//     const [year, month, day] = dateStr.split("-").map(Number);
//     return new Date(year, month - 1, day);
//   };

//   // Filtrera clocks baserat på valt datumintervall
//   const filteredClocks = selectedUser?.clocks?.filter((clock) => {
//     if (!startDate && !endDate) return true;

//     const clockDateObj = new Date(clock.clockInDate);
//     const clockDate = new Date(
//       clockDateObj.getFullYear(),
//       clockDateObj.getMonth(),
//       clockDateObj.getDate()
//     ).setHours(0, 0, 0, 0);

//     const start = startDate
//       ? parseLocalDate(startDate).setHours(0, 0, 0, 0)
//       : null;
//     const end = endDate ? parseLocalDate(endDate).setHours(0, 0, 0, 0) : null;

//     if (start && end) return clockDate >= start && clockDate <= end;
//     if (start) return clockDate >= start;
//     if (end) return clockDate <= end;

//     return true;
//   });

//   // Funktion för att formatera minuter till "xh ym"
//   const formatMinutes = (minutes) => {
//     if (minutes === 0) return "0h 0m";
//     if (!minutes) return "-";
//     const h = Math.floor(minutes / 60);
//     const m = minutes % 60;
//     return `${h}h ${m}m`;
//   };

//   // Beräkna total tid för hela datumintervallet
//   const totalMinutesAll = filteredClocks?.reduce(
//     (acc, clock) => acc + (clock.totalMinutes || 0),
//     0
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-4 flex justify-between items-center">
//         <span>Tidrapport</span>
//         {selectedUser && (
//           <span className="text-lg font-semibold">
//             Total: {formatMinutes(totalMinutesAll || 0)}
//           </span>
//         )}
//       </h1>

//       {/* Välj användare */}
//       <div className="mb-4 flex flex-wrap gap-4 items-center">
//         <div>
//           <label className="mr-2 font-semibold">Välj användare:</label>
//           <select
//             className="border rounded p-1"
//             value={selectedUserId || ""}
//             onChange={(e) => setSelectedUserId(e.target.value)}>
//             <option value="">-- Välj --</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Datumfilter */}
//         <div>
//           <label className="mr-2 font-semibold">Från:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="border rounded p-1"
//           />
//         </div>
//         <div>
//           <label className="mr-2 font-semibold">Till:</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="border rounded p-1"
//           />
//         </div>
//       </div>

//       {/* Visa clocks för vald användare */}
//       {selectedUser ? (
//         <div className="w-full border border-gray-200 rounded">
//           <div className="overflow-y-auto max-h-[600px]">
//             <table className="w-full table-fixed border-collapse">
//               <thead className="bg-gray-50 sticky top-0 z-10">
//                 <tr>
//                   <th className="px-4 py-2 border-b text-left">Datum</th>
//                   <th className="px-4 py-2 border-b text-left">In</th>
//                   <th className="px-4 py-2 border-b text-left">Ut</th>
//                   <th className="px-4 py-2 border-b text-left">Total tid</th>
//                   <th className="px-4 py-2 border-b text-left">Arbetsplats</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredClocks?.length > 0 ? (
//                   filteredClocks.map((clock, i) => (
//                     <tr
//                       key={i}
//                       className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
//                       <td className="px-4  border-b">
//                         {new Date(clock.clockInDate).toLocaleDateString(
//                           "sv-SE"
//                         )}
//                       </td>
//                       <td className="px-4 py-2 border-b">
//                         {new Date(clock.clockInDate).toLocaleTimeString(
//                           "sv-SE"
//                         )}
//                       </td>
//                       <td className="px-4 py-2 border-b">
//                         {clock.clockOutDate
//                           ? new Date(clock.clockOutDate).toLocaleTimeString(
//                               "sv-SE"
//                             )
//                           : "-"}
//                       </td>
//                       <td className="px-4 py-2 border-b">
//                         {clock.totalHoursFormatted || "-"}
//                       </td>
//                       <td className="px-4 py-2 border-b">
//                         {selectedUser.assignedWorkplaces
//                           ?.map((wp) => wp.name)
//                           .join(", ") || "-"}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="text-center py-4 text-gray-500 border-b">
//                       Inga stämplingar hittades för den valda personen
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <p>Välj en användare för att visa tidrapport.</p>
//       )}
//     </div>
//   );
// }

// export default TimeReportPage;

// ny kod för att ladda ner tidrapport som pdf file
"use client";

import React, { useState } from "react";
import LoadingPage from "@/app/loading";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function TimeReportPage() {
  const { users, loading, error } = useFetchUsers();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (loading) return <LoadingPage message="Hämtar tidrapport" />;
  if (error) return <p className="text-red-600">Fel: {error.message}</p>;
  if (!users || users.length === 0) return <p>Inga användare hittades.</p>;

  const selectedUser = users.find((user) => user._id === selectedUserId);

  const parseLocalDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const filteredClocks = selectedUser?.clocks?.filter((clock) => {
    if (!startDate && !endDate) return true;

    const clockDateObj = new Date(clock.clockInDate);
    const clockDate = new Date(
      clockDateObj.getFullYear(),
      clockDateObj.getMonth(),
      clockDateObj.getDate()
    ).setHours(0, 0, 0, 0);

    const start = startDate
      ? parseLocalDate(startDate).setHours(0, 0, 0, 0)
      : null;
    const end = endDate ? parseLocalDate(endDate).setHours(0, 0, 0, 0) : null;

    if (start && end) return clockDate >= start && clockDate <= end;
    if (start) return clockDate >= start;
    if (end) return clockDate <= end;

    return true;
  });

  const formatMinutes = (minutes) => {
    if (minutes === 0) return "0h 0m";
    if (!minutes) return "-";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const totalMinutesAll = filteredClocks?.reduce(
    (acc, clock) => acc + (clock.totalMinutes || 0),
    0
  );

  const downloadPDF = () => {
    if (!filteredClocks || filteredClocks.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Tidrapport: ${selectedUser.name}`, 14, 20);

    // Automatisk period från stämplingarna
    let startText = startDate;
    let endText = endDate;

    if (!startDate && filteredClocks.length > 0) {
      const minDate = new Date(
        Math.min(...filteredClocks.map((c) => new Date(c.clockInDate)))
      );
      startText = minDate.toLocaleDateString("sv-SE");
    }

    if (!endDate && filteredClocks.length > 0) {
      const maxDate = new Date(
        Math.max(...filteredClocks.map((c) => new Date(c.clockInDate)))
      );
      endText = maxDate.toLocaleDateString("sv-SE");
    }

    startText = startText || "Alla";
    endText = endText || "Alla";

    doc.setFontSize(12);
    doc.text(`Period: ${startText} - ${endText}`, 14, 28);

    const tableData = filteredClocks.map((clock) => [
      new Date(clock.clockInDate).toLocaleDateString("sv-SE"),
      new Date(clock.clockInDate).toLocaleTimeString("sv-SE"),
      clock.clockOutDate
        ? new Date(clock.clockOutDate).toLocaleTimeString("sv-SE")
        : "-",
      clock.totalHoursFormatted || "-",
      selectedUser.assignedWorkplaces?.map((wp) => wp.name).join(", ") || "-",
    ]);

    autoTable(doc, {
      startY: 35,
      head: [["Datum", "In", "Ut", "Total tid", "Arbetsplats"]],
      body: tableData,
      styles: { cellPadding: 3, fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    doc.text(
      `Totalt: ${formatMinutes(totalMinutesAll || 0)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(
      `tidrapport_${selectedUser.name}_${startText.replaceAll(
        "/",
        "-"
      )}_${endText.replaceAll("/", "-")}.pdf`
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 flex justify-between items-center">
        <span>Tidrapport</span>
        {selectedUser && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-semibold">
              Total: {formatMinutes(totalMinutesAll || 0)}
            </span>
            <button
              onClick={downloadPDF}
              disabled={!filteredClocks || filteredClocks.length === 0}
              className={`rounded bg-green-500 text-white px-2 py-1 text-xs transition hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}>
              Ladda ner rapport
            </button>
          </div>
        )}
      </h1>

      {/* Välj användare och datumfilter */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="mr-2 font-semibold">Välj användare:</label>
          <select
            className="border rounded p-1"
            value={selectedUserId || ""}
            onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">-- Välj --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Från:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-1"
          />
        </div>
        <div>
          <label className="mr-2 font-semibold">Till:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-1"
          />
        </div>
      </div>

      {/* Tabell */}
      {selectedUser ? (
        <div className="w-full border border-gray-200 rounded">
          <div className="overflow-y-auto max-h-[600px]">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Datum</th>
                  <th className="px-4 py-2 border-b text-left">In</th>
                  <th className="px-4 py-2 border-b text-left">Ut</th>
                  <th className="px-4 py-2 border-b text-left">Total tid</th>
                  <th className="px-4 py-2 border-b text-left">Arbetsplats</th>
                </tr>
              </thead>
              <tbody>
                {filteredClocks?.length > 0 ? (
                  filteredClocks.map((clock, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                      <td className="px-4 py-2 border-b">
                        {new Date(clock.clockInDate).toLocaleDateString(
                          "sv-SE"
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {new Date(clock.clockInDate).toLocaleTimeString(
                          "sv-SE"
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {clock.clockOutDate
                          ? new Date(clock.clockOutDate).toLocaleTimeString(
                              "sv-SE"
                            )
                          : "-"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {clock.totalHoursFormatted || "-"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {selectedUser.assignedWorkplaces
                          ?.map((wp) => wp.name)
                          .join(", ") || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-4 text-gray-500 border-b">
                      Inga stämplingar hittades för den valda personen
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Välj en användare för att visa tidrapport.</p>
      )}
    </div>
  );
}

export default TimeReportPage;
