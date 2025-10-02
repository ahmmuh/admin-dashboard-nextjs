"use client";

import React, { useEffect, useState } from "react";
import LoadingPage from "@/app/loading";
import { useFetchUsers } from "@/customhook/useFetchUsers";

function TimeReportPage() {
  const { users, loading, error } = useFetchUsers();

  console.log("USERS I TIMEREPORT PAGE", users);
  // Uppdatera userList när hooken får data
//   useEffect(() => {
//     if (users) setUserList(users);
//   }, [users]);

  if (loading) return <LoadingPage message="Hämtar användare..." />;
  if (error) return <p className="text-red-600">Fel: {error.message}</p>;
  if (!users || users.length === 0) return <p>Inga användare hittades.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Tidrapport</h1>
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 border-b">Användare</th>
            <th className="px-4 py-2 border-b">Datum</th>
            <th className="px-4 py-2 border-b">In</th>
            <th className="px-4 py-2 border-b">Ut</th>
            <th className="px-4 py-2 border-b">Total tid</th>
            <th className="px-4 py-2 border-b">Arbetsplats</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) =>
              user.clocks?.map((clock, i) => (
                <tr key={`${user._id}-${i}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(clock.clockInDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(clock.clockInDate).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {clock.clockOutDate
                      ? new Date(clock.clockOutDate).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {clock.clockOutDate
                      ? `${Math.round(
                          (new Date(clock.clockOutDate) -
                            new Date(clock.clockInDate)) /
                            60000
                        )} min`
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {user.assignedWorkplaces?.map((wp) => wp.name).join(", ") ||
                      "-"}
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
}

export default TimeReportPage;
