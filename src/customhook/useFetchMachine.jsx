"use client";

import {
  borrowMachine,
  createMachine,
  deleteMachine,
  getMachineLogs,
  getMachines,
  returnMachine,
  searchMachines,
  updateMachine,
} from "@/backend/machineAPI";
import { displayErrorMessage } from "@/helper/toastAPI";
import { useEffect, useState } from "react";

export function useFetchMachines() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [machineLogs, setMachineLogs] = useState([]);

  // Hämta alla maskiner
  const fetchMachines = async () => {
    setLoading(true);
    try {
      const machineList = await getMachines();
      if (!machineList || machineList.length === 0) {
        // console.log("Inga maskiner finns");
      }
      // console.log("Alla hämtade maskiner:", machineList);
      setMachines(machineList);
    } catch (err) {
      // console.error("Fel vid hämtning av maskiner:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Skapa maskin
  const addMachine = async (newMachine) => {
    try {
      const created = await createMachine(newMachine); // backend returnerar { message, machine }
      if (created?.machine) setMachines((prev) => [...prev, created.machine]);
      return created?.machine || null;
    } catch (err) {
      // console.error("Fel vid skapande av maskin:", err.message);
      setError(err);
      return null;
    }
  };

  // --- Maskinloggar ---
  const fetchMachineLogs = async () => {
    try {
      const logs = await getMachineLogs();
      // console.log("MASKIN LOGS", logs);

      setMachineLogs(logs || []);
    } catch (err) {
      // console.error("Fel vid hämtning av maskinloggar:", err.message);
      displayErrorMessage(err);
      setMachineLogs([]);
    }
  };

  useEffect(() => {
    fetchMachines();
    fetchMachineLogs(); // hämtar loggar direkt vid mount
  }, []);
  // Uppdatera maskin
  const editMachine = async (machineId, updatedMachine) => {
    try {
      const updated = await updateMachine(machineId, updatedMachine); // backend returnerar { message, machine }?
      if (updated?.machine) {
        setMachines((prev) =>
          prev.map((m) => (m._id === machineId ? updated.machine : m))
        );
      }
      return updated?.machine || null;
    } catch (err) {
      // console.error("Fel vid uppdatering av maskin:", err.message);
      setError(err);
      return null;
    }
  };

  // Ta bort maskin
  const removeMachine = async (machineId) => {
    try {
      const deleted = await deleteMachine(machineId); // backend returnerar { message, machine }
      if (deleted?.machine) {
        setMachines((prev) => prev.filter((m) => m._id !== machineId));
      }
      return deleted?.machine || null;
    } catch (err) {
      // console.error("Fel vid borttagning av maskin:", err.message);
      setError(err);
      return null;
    }
  };

  // Låna maskin
  const borrow = async (machineId, userId) => {
    try {
      const borrowed = await borrowMachine(machineId, userId); // backend returnerar { message, machine }
      if (borrowed?.machine) {
        setMachines((prev) =>
          prev.map((m) => (m._id === machineId ? borrowed.machine : m))
        );
      }
      return borrowed?.machine || null;
    } catch (err) {
      // console.error("Fel vid utlåning av maskin:", err.message);
      setError(err);
      return null;
    }
  };

  // Återlämna maskin
  const returnBack = async (machineId) => {
    try {
      const returned = await returnMachine(machineId); // backend returnerar { message, machine }
      if (returned?.machine) {
        setMachines((prev) =>
          prev.map((m) => (m._id === machineId ? returned.machine : m))
        );
      }
      return returned?.machine || null;
    } catch (err) {
      // console.error("Fel vid återlämning av maskin:", err.message);
      setError(err);
      return null;
    }
  };

  // Sök maskiner
  const search = async (query) => {
    try {
      const results = await searchMachines(query); // backend returnerar { message, machines }
      return results?.machines || [];
    } catch (err) {
      // console.error("Fel vid sökning av maskiner:", err.message);
      setError(err);
      return [];
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return {
    machineLogs,
    fetchMachineLogs,
    machines,
    fetchMachines,
    addMachine,
    editMachine,
    removeMachine,
    borrow,
    returnBack,
    search,
    loading,
    error,
  };
}
