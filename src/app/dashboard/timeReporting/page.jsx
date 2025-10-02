"use client";

import React, { useState } from "react";
import LoadingPage from "@/app/loading";
import { useFetchUsers } from "@/customhook/useFetchUsers";

function TimeReportPage() {
  const { users, loading, error } = useFetchUsers();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (loading) return <LoadingPage message="Hämtar användare..." />;
  if (error) return <p className="text-red-600">Fel: {error.message}</p>;
  if (!users || users.length === 0) return <p>Inga användare hittades.</p>;

  const selectedUser = users.find((user) => user._id === selectedUserId);

  // Filtrera clocks baserat på valt datumintervall
  const filteredClocks = selectedUser?.clocks?.filter((clock) => {
    if (!startDate && !endDate) return true;

    const clockDate = new Date(clock.clockInDate).setHours(0, 0, 0, 0);
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

    if (start && end) return clockDate >= start && clockDate <= end;
    if (start) return clockDate >= start;
    if (end) return clockDate <= end;

    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Tidrapport</h1>

      {/* Välj användare */}
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

        {/* Datumfilter */}
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

      {/* Visa clocks för vald användare */}
      {selectedUser ? (
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border-b">Datum</th>
              <th className="px-4 py-2 border-b">In</th>
              <th className="px-4 py-2 border-b">Ut</th>
              <th className="px-4 py-2 border-b">Total tid</th>
              <th className="px-4 py-2 border-b">Arbetsplats</th>
            </tr>
          </thead>
          <tbody>
            {filteredClocks?.length > 0 ? (
              filteredClocks.map((clock, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    {new Date(clock.clockInDate).toLocaleDateString("sv-SE")}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(clock.clockInDate).toLocaleTimeString("sv-SE")}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {clock.clockOutDate
                      ? new Date(clock.clockOutDate).toLocaleTimeString("sv-SE")
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
                  Inga stämplingar hittades för valt datumintervall
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p>Välj en användare för att visa tidrapport.</p>
      )}
    </div>
  );
}

export default TimeReportPage;
