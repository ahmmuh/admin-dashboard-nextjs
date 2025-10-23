"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { useFetchUsers } from "@/customhook/useFetchUsers";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { HiOutlineInformationCircle } from "react-icons/hi";

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
      let filteredUsers = [];

      // Avdelningschef / Områdeschef
      if (roles.includes("Avdelningschef") || roles.includes("Områdeschef")) {
        filteredUsers = users.filter(
          (u) =>
            !u.role.includes("Avdelningschef") &&
            !u.role.includes("Områdeschef")
        );
        // Lägg till sig själv
        filteredUsers.push(currentUser);
      }
      // Enhetschef
      else if (roles.includes("Enhetschef") && currentUser.unit?._id) {
        filteredUsers = users.filter(
          (u) =>
            u.unit?._id?.toString() === currentUser.unit._id.toString() ||
            u._id === currentUser._id
        );
      }
      setBorrowableUsers(filteredUsers);
    }
  }, [users, usersLoading, currentUser]);

  if (machinesLoading || usersLoading || currentUserLoading)
    return <LoadingPage message="Hämtar data..." />;

  if (!machine)
    return (
      <p className="text-red-500 text-center mt-10">Ingen maskin hittades.</p>
    );

  const roles = currentUser.role;
  const isOmrådeschef = roles.includes("Områdeschef");
  const isAvdelningschef = roles.includes("Avdelningschef");
  const isEnhetschef = roles.includes("Enhetschef");

  // Enhetschef får bara hantera maskiner på sin egen enhet
  const canBorrowReturn =
    isAvdelningschef ||
    isOmrådeschef ||
    (isEnhetschef &&
      currentUser.unit?._id?.toString() === machine.unitId?._id?.toString());

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
      displayErrorMessage("Kunde inte låna ut maskinen");
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
      displayErrorMessage("Kunde inte återlämna maskinen ❌");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-6 space-y-6 border border-gray-200">
        <h4 className="font-medium text-gray-800">Maskintyp: {machine.name}</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-800 ">
              Ägs av: {machine.unitId?.name || "-"}
            </p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Status: </span>
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

        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-x-3">
            <h2 className="font-semibold text-gray-700">Låneinformation</h2>
            <HiOutlineInformationCircle className="bg-green-50 text-gray-500" />
          </div>

          {machine.borrowedBy ? (
            <>
              <p className="text-gray-700">
                <span className="">
                  Utlåning utfört av {currentUser && currentUser?.name} :
                </span>{" "}
              </p>
              <p className="text-gray-700">
                <span className="">Utlånad till:</span>{" "}
                {machine.borrowedBy.name}{" "}
                <span className="text-gray-500">
                  ({machine.borrowedBy.unit?.name || "-"})
                </span>
              </p>
              <p className="text-gray-700">
                <span className="">Utlåningsdatum:</span>{" "}
                {formatDate(machine.borrowedDate)}
              </p>
              {machine.returnedDate && (
                <p className="text-gray-700">
                  <span className="">Inlämningsdatum:</span>{" "}
                  {formatDate(machine.returnedDate)}
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500">Ingen tidigare utlåning registrerad</p>
          )}
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

        {/* Enhetschef försöker hantera maskin på annan enhet */}
        {isEnhetschef &&
          currentUser.unit?._id?.toString() !==
            machine.unitId?._id?.toString() && (
            <p className="text-red-500 font-medium mt-4">
              <FontAwesomeIcon icon={faStopCircle} /> Du kan inte låna ut eller
              lämna in maskiner som tillhör andra enheter.
            </p>
          )}
      </div>
    </div>
  );
}
