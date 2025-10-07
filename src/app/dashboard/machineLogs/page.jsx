"use client";

import { useFetchMachines } from "@/customhook/useFetchMachine";
import LoadingPage from "@/app/loading"; // importera din LoadingPage
import React, { useState, useEffect } from "react";

export default function MachineLogsPage() {
  const {
    machineLogs,
    loading: machineLogLoading,
    fetchMachineLogs,
  } = useFetchMachines();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);

  const actionMap = {
    CREATED: "Skapad",
    BORROWED: "Utlånad",
    RETURNED: "Återlämnad",
    UPDATED: "Uppdaterad",
    DELETED: "Borttagen",
  };

  useEffect(() => {
    fetchMachineLogs();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLogs(machineLogs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = machineLogs.filter((log) => {
        const performedBy = log.performedBy?.name?.toLowerCase() || "";
        const machineName = log.machine?.name?.toLowerCase() || "";
        const action = (actionMap[log.action] || log.action).toLowerCase();
        const workplace = log.workplace?.name?.toLowerCase() || "";
        const unit = log.unit?.name?.toLowerCase() || "";

        return (
          performedBy.includes(query) ||
          machineName.includes(query) ||
          action.includes(query) ||
          workplace.includes(query) ||
          unit.includes(query)
        );
      });
      setFilteredLogs(filtered);
    }
  }, [searchQuery, machineLogs]);

  if (machineLogLoading) {
    return <LoadingPage message="Hämtar maskin lånehistorik" />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-blue-500">Maskinloggar</h1>

      <input
        type="text"
        placeholder="Sök loggar..."
        className="border rounded px-3 py-2 mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="overflow-y-auto max-h-[600px] border rounded">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-2 border">Tidpunkt</th>
              <th className="p-2 border">Maskintyp</th>
              <th className="p-2 border">Åtgärd</th>
              <th className="p-2 border">Utförd av</th>
              <th className="p-2 border">Arbetsplats</th>
              <th className="p-2 border">Enhet</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Inga loggar att visa
                </td>
              </tr>
            ) : (
              filteredLogs.map((log, i) => (
                <tr
                  key={log._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-200 hover:bg-gray-50" : "bg-white"
                  }`}>
                  <td className="p-2 border">
                    {new Date(log.timestamp).toLocaleString("sv-SE")}
                  </td>
                  <td className="p-2 border">{log.machine?.name || "-"}</td>
                  <td className="p-2 border">
                    {actionMap[log.action] || log.action}
                  </td>
                  <td className="p-2 border">{log.performedBy?.name || "-"}</td>
                  <td className="p-2 border">{log.workplace?.name || "-"}</td>
                  <td className="p-2 border">{log.unit?.name || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
