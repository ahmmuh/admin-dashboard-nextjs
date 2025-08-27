"use client";
import LoadingPage from "@/app/loading";
import { getKeyLogs } from "@/backend/keyAPI";
import KeySearch from "@/components/keys/keySearch";
import SearchInput from "@/components/searhInput";
import { useFetchKeys } from "@/customhook/useFetchKeys";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import React, { useEffect, useState } from "react";

function KeyLogPage() {
  const [logs, setLogs] = useState([]);
  const { users } = useFetchUsers();
  const { keys } = useFetchKeys();
  // console.log("USERS", users);
  console.log("keys", keys);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleLogs, setVisibleLogs] = useState(15);

  const searchHandler = (e) => {};

  async function fetchLogs() {
    try {
      const logData = await getKeyLogs();
      console.log("KEY LOG DATA", logData);
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

  if (loading) {
    return <LoadingPage message="Vi hämtar nyckelhistorik..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-red-600 p-10">
        <h4 className="text-2xl text-white-500">Error</h4>
      </div>
    );
  }
  if (Array.isArray(logs) && logs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-3">
        <h4 className="text-2xl text-green-700">Inga loggar finns att visa</h4>
      </div>
    );
  }
  return (
    <>
      <div className=" hidden md:block mr-5 mt-10">
        <KeySearch />
      </div>
      <div className="pb-20 ">
        <table className="border border-gray-200 w-full ">
          <thead>
            <tr>
              <th className="border border-gray-200 text-left">
                Nyckelbeteckning
              </th>
              <th className="border border-gray-200 text-left">Plats</th>
              <th className="border border-gray-200 text-left">Lånetagare</th>
              <th className="border border-gray-200 text-left">
                Utlånat datum
              </th>
              <th className="border border-gray-200 text-left">
                Inlämnat datum
              </th>
              <th className="border border-gray-200 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="">
            {logs &&
              logs.slice(0, visibleLogs).map((log) => (
                <tr key={log._id} className="hover:bg-gray-200 pl-2 pt-3 pb-20">
                  <td className="text-black border border-gray-200 border-b-2 p-1">
                    <span className="pr-2">🔑</span>
                    {log.key ? log.key.keyLabel : "Nyckel saknas"}
                  </td>
                  <td className="text-black border border-gray-200 border-b-2 p-1">
                    {log.key ? log.key.location : "Ingen plats"}
                  </td>

                  <td className="text-black border border-gray-200 border-b-2 p-1">
                    {log.key?.lastBorrowedBy?.name || log.key?.borrowedBy?.name}
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
    </>
  );
}

export default KeyLogPage;
