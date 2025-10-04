"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import LoadingPage from "@/app/loading";

export default function MachineDetailPage() {
  const { machineId } = useParams();
  const { machines, loading: machinesLoading } = useFetchMachines();
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    if (!machinesLoading && machines) {
      const found = machines.find((m) => m._id === machineId);
      setMachine(found || null);
    }
  }, [machines, machinesLoading, machineId]);

  if (machinesLoading)
    return <LoadingPage message="Hämtar maskindetaljer...." />;
  if (!machine)
    return <p className="text-red-500">❌ Ingen maskin hittades.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gray-50 shadow-sm rounded-lg p-6 space-y-5 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">{machine.name}</h1>

        <p>
          <span className="font-medium text-gray-700">Enhet:</span>{" "}
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

        {machine.qrCode && (
          <div className="flex flex-col items-center gap-2">
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
      </div>
    </div>
  );
}
