// import {
//   borrowMachine,
//   createMachine,
//   deleteMachine,
//   getMachines,
//   returnMachine,
//   searchMachines,
//   updateMachine,
// } from "@/backend/machineAPI";
// import { useEffect, useState } from "react";

// export function useFetchMachines() {
//   const [machines, setMachines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Hämta alla maskiner
//   const fetchMachines = async () => {
//     setLoading(true);
//     try {
//       const machineList = await getMachines();
//       if (!machineList || machineList.length === 0) {
//         console.log("Inga maskiner finns");
//       }
//       console.log("Alla hämtade maskiner:", machineList);
//       setMachines(machineList);
//     } catch (err) {
//       console.error("Fel vid hämtning av maskiner:", err.message);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Skapa maskin
//   const addMachine = async (newMachine) => {
//     try {
//       const created = await createMachine(newMachine);
//       if (created) setMachines((prev) => [...prev, created]);
//       return created;
//     } catch (err) {
//       console.error("Fel vid skapande av maskin:", err.message);
//       setError(err);
//       return null;
//     }
//   };

//   // Uppdatera maskin
//   const editMachine = async (machineId, updatedMachine) => {
//     try {
//       const updated = await updateMachine(machineId, updatedMachine);
//       if (updated) {
//         setMachines((prev) =>
//           prev.map((m) => (m._id === machineId ? updated : m))
//         );
//       }
//       return updated;
//     } catch (err) {
//       console.error("Fel vid uppdatering av maskin:", err.message);
//       setError(err);
//       return null;
//     }
//   };

//   // Ta bort maskin
//   const removeMachine = async (machineId) => {
//     try {
//       const deleted = await deleteMachine(machineId);
//       if (deleted) {
//         setMachines((prev) => prev.filter((m) => m._id !== machineId));
//       }
//       return deleted;
//     } catch (err) {
//       console.error("Fel vid borttagning av maskin:", err.message);
//       setError(err);
//       return null;
//     }
//   };

//   // Låna maskin
//   const borrow = async (machineId, userId) => {
//     try {
//       const borrowed = await borrowMachine(machineId, userId);
//       if (borrowed) {
//         setMachines((prev) =>
//           prev.map((m) => (m._id === machineId ? borrowed : m))
//         );
//       }
//       return borrowed;
//     } catch (err) {
//       console.error("Fel vid utlåning av maskin:", err.message);
//       setError(err);
//       return null;
//     }
//   };

//   // Återlämna maskin
//   const returnBack = async (machineId) => {
//     try {
//       const returned = await returnMachine(machineId);
//       if (returned) {
//         setMachines((prev) =>
//           prev.map((m) => (m._id === machineId ? returned : m))
//         );
//       }
//       return returned;
//     } catch (err) {
//       console.error("Fel vid återlämning av maskin:", err.message);
//       setError(err);
//       return null;
//     }
//   };

//   // Sök maskiner
//   const search = async (query) => {
//     try {
//       const results = await searchMachines(query);
//       return results || [];
//     } catch (err) {
//       console.error("Fel vid sökning av maskiner:", err.message);
//       setError(err);
//       return [];
//     }
//   };

//   useEffect(() => {
//     fetchMachines();
//   }, []);

//   return {
//     machines,
//     fetchMachines,
//     addMachine,
//     editMachine,
//     removeMachine,
//     borrow,
//     returnBack,
//     search,
//     loading,
//     error,
//   };
// }

"use client";

import {
  borrowMachine,
  createMachine,
  deleteMachine,
  getMachines,
  returnMachine,
  searchMachines,
  updateMachine,
} from "@/backend/machineAPI";
import { useEffect, useState } from "react";

export function useFetchMachines() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hämta alla maskiner
  const fetchMachines = async () => {
    setLoading(true);
    try {
      const machineList = await getMachines();
      if (!machineList || machineList.length === 0) {
        console.log("Inga maskiner finns");
      }
      console.log("Alla hämtade maskiner:", machineList);
      setMachines(machineList);
    } catch (err) {
      console.error("Fel vid hämtning av maskiner:", err.message);
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
      console.error("Fel vid skapande av maskin:", err.message);
      setError(err);
      return null;
    }
  };

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
      console.error("Fel vid uppdatering av maskin:", err.message);
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
      console.error("Fel vid borttagning av maskin:", err.message);
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
      console.error("Fel vid utlåning av maskin:", err.message);
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
      console.error("Fel vid återlämning av maskin:", err.message);
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
      console.error("Fel vid sökning av maskiner:", err.message);
      setError(err);
      return [];
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return {
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
