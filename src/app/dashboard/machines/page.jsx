"use client";

import React from "react";
import Link from "next/link";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "@/app/loading";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { HiPlus } from "react-icons/hi";

export default function MachinePage() {
  const { machines, loading, error, removeMachine, borrow, returnBack } =
    useFetchMachines();
  const { currentUser, loading: currentUserLoading } = useFetchCurrentUser();

  if (loading || currentUserLoading)
    return <LoadingPage message="Hämtar maskiner..." />;

  if (error)
    return (
      <p className="text-red-500">
        Fel vid hämtning av maskiner: {error.message}
      </p>
    );

  const roles = currentUser.role;

  // Kontrollerar om användaren kan hantera maskinen (låna/lämna in)
  const canManage = (machine, borrower) => {
    // Avdelningschef / Områdeschef kan alltid
    if (roles.includes("Avdelningschef") || roles.includes("Områdeschef"))
      return true;

    // Enhetschef kan bara hantera maskiner på sin egen enhet
    if (roles.includes("Enhetschef")) {
      const isMachineOnOwnUnit = machine.unitId?._id === currentUser.unit?._id;
      const isBorrowerOnOwnUnit = borrower?.unit?._id === currentUser.unit?._id;

      // Hantera maskiner på chefens enhet åt användare på samma enhet
      return isMachineOnOwnUnit && isBorrowerOnOwnUnit;
    }

    // Vanlig användare kan bara hantera sina egna lån
    return borrower?._id === currentUser._id;
  };

  // Kontrollera om "Lämna in"-knappen ska visas
  const showReturnButton = (machine, borrower) => {
    if (roles.includes("Avdelningschef") || roles.includes("Områdeschef"))
      return true;

    if (roles.includes("Enhetschef")) {
      const isMachineOnOwnUnit = machine.unitId?._id === currentUser.unit?._id;
      const isBorrowerOnOwnUnit = borrower?.unit?._id === currentUser.unit?._id;
      return isMachineOnOwnUnit && isBorrowerOnOwnUnit;
    }

    // Vanlig användare kan alltid lämna in sin egen maskin
    return borrower?._id === currentUser._id;
  };

  const handleDelete = async (id) => {
    if (!confirm("Är du säker på att du vill ta bort denna maskin?")) return;
    try {
      await removeMachine(id);
      displaySuccessMessage("Maskin borttagen ✅");
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte ta bort maskinen ❌");
    }
  };

  const handleBorrow = async (machine) => {
    try {
      const result = await borrow(machine._id, currentUser._id);
      if (result?.machine) displaySuccessMessage("Maskin utlånad ✅");
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte låna ut maskinen ❌");
    }
  };

  const handleReturn = async (machine) => {
    try {
      const result = await returnBack(machine._id);
      if (result?.machine) displaySuccessMessage("Maskin återlämnad ✅");
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte lämna in maskinen ❌");
    }
  };

  if (!machines || machines.length === 0)
    return (
      <div>
        <Link
          className="text-green-800 flex items-center gap-3 mb-3"
          href={"/dashboard/machines/create"}>
          <HiPlus />
          <span>Lägg till ny maskin</span>
        </Link>
        <p className="text-gray-500 flex items-center gap-2">
          <FontAwesomeIcon icon={faGears} className="h-5 w-5" /> Inga maskiner
          att visa just nu.
        </p>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maskiner</h1>
        <Link
          href="/dashboard/machines/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          + Skapa ny
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Namn</th>
              <th className="px-4 py-3">Enhet</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m, i) => (
              <tr
                key={m._id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}>
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3">{m.unitId?.name || "-"}</td>
                <td className="px-4 py-3">
                  {m.isAvailable ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Tillgänglig
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                      Utlånad
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      href={`/dashboard/machines/${m._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                      Detaljer
                    </Link>
                    <Link
                      href={`/dashboard/machines/${m._id}/edit`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                      Redigera
                    </Link>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                      Ta bort
                    </button>

                    {/* Låna ut-knapp */}
                    {canManage(m, m.borrowedBy) && m.isAvailable && (
                      <button
                        onClick={() => handleBorrow(m)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">
                        Låna ut
                      </button>
                    )}

                    {/* Lämna in-knapp */}
                    {canManage(m, m.borrowedBy) &&
                      !m.isAvailable &&
                      showReturnButton(m, m.borrowedBy) && (
                        <button
                          onClick={() => handleReturn(m)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs">
                          Lämna in
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
