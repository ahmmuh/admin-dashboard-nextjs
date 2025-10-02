"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faGears } from "@fortawesome/free-solid-svg-icons";

export default function MachinePage() {
  const { machines, loading, error } = useFetchMachines();
  const [showQr, setShowQr] = useState({});

  const toggleQr = (id) => {
    setShowQr({ ...showQr, [id]: !showQr[id] });
  };

  const downloadQr = (qrCode, name) => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${name}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Laddar maskiner...</p>;
  if (error)
    return (
      <p className="text-red-500">
        Fel vid hämtning av maskiner: {error.message}
      </p>
    );

  if (!machines || machines.length === 0)
    return (
      <p className="text-gray-500">
        {" "}
        <FontAwesomeIcon icon={faGears} className="h-5, w-5" /> Inga maskiner
        att visa just nu.
      </p>
    );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Maskiner</h1>
        <Link
          href="/dashboard/machines/create"
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Skapa ny
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Namn</th>
            <th className="p-2 border">Enhet</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">QR</th>
            <th className="p-2 border">Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((m) => (
            <tr key={m._id} className="text-center">
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{m.unit?.name || "-"}</td>
              <td className="p-2 border">
                {m.isAvailable ? "Tillgänglig" : "Utlånad"}
              </td>
              <td className="p-2 border">
                {m.qrCode ? (
                  <>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded mr-2"
                      onClick={() => toggleQr(m._id)}>
                      {showQr[m._id] ? "Dölj QR" : "Visa QR"}
                    </button>
                    {showQr[m._id] && (
                      <div className="mt-2">
                        <img
                          src={m.qrCode}
                          alt={m.name}
                          className="w-24 h-24 mx-auto"
                        />
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded mt-1"
                          onClick={() => downloadQr(m.qrCode, m.name)}>
                          Ladda ner
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400">Ingen QR</span>
                )}
              </td>
              <td className="p-2 border flex flex-col gap-1 items-center">
                <Link
                  href={`/dashboard/machines/${m._id}`}
                  className="bg-blue-400 px-2 py-1 rounded text-white">
                  Detaljer
                </Link>
                <Link
                  href={`/dashboard/machines/edit/${m._id}`}
                  className="bg-yellow-400 px-2 py-1 rounded text-white">
                  Redigera
                </Link>
                {m.isAvailable ? (
                  <Link
                    href={`/dashboard/machines/${m._id}/borrow`}
                    className="bg-purple-400 px-2 py-1 rounded text-white">
                    Låna
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/machines/${m._id}/return`}
                    className="bg-red-400 px-2 py-1 rounded text-white">
                    Återlämna
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
