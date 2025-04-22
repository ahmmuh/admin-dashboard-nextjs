"use client";
import { getKeyLogs } from "@/backend/keyAPI";
import React, { useEffect, useState } from "react";

function KeyLogPage() {
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState(15);

  async function fetchLogs() {
    try {
      const logData = await getKeyLogs();
      console.log("KEY LOG DATA", logData);
      setLogs(logData);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <h5>Loading .....</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-red-600 p-10">
        <h4 className="text-2xl text-white-500">Error</h4>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <table className="border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="border border-gray-200 text-left">
              Nyckelbeteckning
            </th>
            <th className="border border-gray-200 text-left">Tillhör</th>
            <th className="border border-gray-200 text-left">Lånetagare</th>
            <th className="border border-gray-200 text-left">Utlånat datum</th>
            <th className="border border-gray-200 text-left">Inlämnat datum</th>
            <th className="border border-gray-200 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="">
          {logs &&
            logs.slice(0, visibleLogs).map((log) => (
              <tr key={log._id} className="hover:bg-gray-200 pl-2 pt-3 pb-20">
                <td className="text-black border border-gray-200 border-b-2 p-1">
                  {log.key ? log.key.keyLabel : "Nyckel saknas"}
                </td>
                <td className="text-black border border-gray-200 border-b-2 p-1">
                  {log.key ? log.key.location : "Ingen plats"}
                </td>
                <td className="text-black border border-gray-200 border-b-2 p-1">
                  {log.key?.borrowedBy
                    ? log.key.borrowedBy.name
                    : "Ej lånetagare"}
                </td>
                <td className="text-black border border-gray-200 border-b-2 p-1">
                  {log.key?.borrowedAt
                    ? new Date(log.key.borrowedAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="text-black border border-gray-200 border-b-2 p-1">
                  {log.key?.returnedAt
                    ? new Date(log.key.returnedAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="text-black border border-gray-200 border-b-2 p-1">
                  {log.key?.status === "returned" ? "Inlämnad" : "Utlånad"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {visibleLogs < logs.length && (
        <button
          className="bg-red-100 p-2 my-4"
          onClick={() => setVisibleLogs(visibleLogs + 10)}>
          Visa fler
        </button>
      )}
    </div>
  );
}

export default KeyLogPage;
