"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";

export default function MachineDetailPage() {
  const router = useRouter();
  const { machineId } = useParams();

  const {
    machines,
    borrow,
    returnBack,
    loading: machinesLoading,
  } = useFetchMachines();
  const { users, loading: usersLoading } = useFetchUsers();
  const { currentUser, loading: currentUserLoading } = useFetchCurrentUser();

  const [machine, setMachine] = useState(null);
  const [borrowableUsers, setBorrowableUsers] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  // Hitta maskinen
  useEffect(() => {
    if (!machinesLoading && machines) {
      const found = machines.find((m) => m._id === machineId);
      setMachine(found || null);
    }
  }, [machines, machinesLoading, machineId]);

  // Filtrera användare baserat på roll
  useEffect(() => {
    if (!usersLoading && users && currentUser) {
      const roles = currentUser.role;

      if (roles.includes("Avdelningschef") || roles.includes("Områdeschef")) {
        // Ser alla användare
        setBorrowableUsers(users);
      } else if (roles.includes("Enhetschef") && currentUser.unit?._id) {
        // Ser bara användare på sin egen enhet
        setBorrowableUsers(
          users.filter(
            (u) => u.unit?._id?.toString() === currentUser.unit._id.toString()
          )
        );
      } else {
        setBorrowableUsers([]);
      }
    }
  }, [users, usersLoading, currentUser]);

  if (machinesLoading || usersLoading || currentUserLoading)
    return <LoadingPage message="Hämtar data..." />;

  if (!machine)
    return (
      <p className="text-red-500 text-center mt-10">
        ❌ Ingen maskin hittades.
      </p>
    );

  const roles = currentUser.role;
  const canBorrowReturn =
    roles.includes("Avdelningschef") ||
    roles.includes("Områdeschef") ||
    (roles.includes("Enhetschef") && currentUser.unit?._id);

  const handleBorrow = async (userId) => {
    if (!canBorrowReturn) {
      displayErrorMessage("Du har inte behörighet att låna ut denna maskin!");
      return;
    }
    setActionLoading(true);
    try {
      const result = await borrow(machine._id, userId);
      if (result?.machine) setMachine(result.machine);
      displaySuccessMessage("Maskin utlånad ✅");
      router.back();
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte låna ut maskinen ❌");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!canBorrowReturn) {
      displayErrorMessage("Du har inte behörighet att återlämna denna maskin!");
      return;
    }
    setActionLoading(true);
    try {
      const result = await returnBack(machine._id);
      if (result?.machine) setMachine(result.machine);
      displaySuccessMessage("Maskin återlämnad ✅");
      router.back();
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte återlämna maskinen ❌");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-6 space-y-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">{machine.name}</h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-800">{machine.unitId?.name || "-"}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Status</span>
            {machine.isAvailable ? (
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-medium text-sm">
                Tillgänglig
              </span>
            ) : (
              <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium text-sm">
                Utlånad
              </span>
            )}
          </div>
        </div>

        {/* Låna ut */}
        {canBorrowReturn && machine.isAvailable && (
          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Låna ut till användare
            </label>
            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              {borrowableUsers.length > 0 ? (
                borrowableUsers.map((u) => (
                  <button
                    key={u._id}
                    disabled={actionLoading}
                    onClick={() => handleBorrow(u._id)}
                    className="text-left px-4 py-2 rounded-md hover:bg-gray-100 bg-white shadow-sm transition duration-150">
                    {u.name}{" "}
                    <span className="text-gray-400">
                      ({u.unit?.name || "-"})
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-gray-500">Inga användare tillgängliga</p>
              )}
            </div>
          </div>
        )}

        {/* Lämna in */}
        {canBorrowReturn && !machine.isAvailable && (
          <div className="mt-4">
            <button
              onClick={handleReturn}
              disabled={actionLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-150">
              Lämna in maskin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
