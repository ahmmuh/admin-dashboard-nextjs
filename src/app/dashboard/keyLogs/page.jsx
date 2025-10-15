"use client";
import LoadingPage from "@/app/loading";
import { getKeyLogs } from "@/backend/keyAPI";
import KeySearch from "@/components/keys/keySearch";
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

  async function fetchLogs() {
    try {
      const logData = await getKeyLogs();
      // console.log("Hämtade nyckelhistorik:", logData);
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

  // Formatera datum
  function formatDate(date) {
    if (!date) return "-";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString("sv-SE");
  }

  // Process logs: separera varje händelse (utlånad och inlämnad)
  const processedLogs = [];
  logs
    .filter((log) => log.key !== null)
    .forEach((log) => {
      // if (!log.key) return;

      // Utlånad
      if (log.borrowedAt || log.action === "checkout") {
        processedLogs.push({
          keyLabel: log.key.keyLabel,
          unit: log.key.unit?.name || "-",
          borrower: log.key.borrowedBy?.name || "-",
          borrowedAt: log.createdAt,
          returnedAt: null,
          status: "Utlånad",
        });
      }

      // Inlämnad
      if (log.returnedAt || log.action === "checkin") {
        processedLogs.push({
          keyLabel: log.key.keyLabel,
          unit: log.key.unit?.name || "-",
          borrower: log.key.lastBorrowedBy?.name || "-",
          returnedAt: log.updatedAt,
          borrowedAt: null,
          status: "Inlämnad",
        });
      }
    });

  // Ta bort exakta dubletter
  const uniqueLogs = processedLogs.filter(
    (log, index, self) =>
      index ===
      self.findIndex(
        (l) =>
          l.keyLabel === log.keyLabel &&
          l.status === log.status &&
          l.borrowedAt === log.borrowedAt &&
          l.returnedAt === log.returnedAt &&
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
            <tbody className="bg-white">
              {uniqueLogs.slice(0, visibleLogs)?.map((log, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}>
                  <td className="border p-1">🔑 {log.keyLabel}</td>
                  <td className="border p-1">{log.unit || "-"}</td>
                  <td className="border p-1">{log.borrower}</td>
                  <td className="border p-1">
                    {log?.borrowedAt ? formatDate(log.borrowedAt) : "_"}
                  </td>
                  <td className="border p-1">
                    {log?.returnedAt ? formatDate(log.returnedAt) : "_"}
                  </td>
                  <td className="border p-1">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="font-semibold p-5 text-red-500">
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
