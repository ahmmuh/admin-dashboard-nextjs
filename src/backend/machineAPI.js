import { fetchWithAuth } from "@/components/authWrapper";
import { BASE_URL } from "./base_url";

// ✅ Skapa ny maskin
export const createMachine = async (newMachine) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/machines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMachine), // { name, unitId }
    });

    console.log("Ny maskin skapad:", data.machine);
    return data.machine;
  } catch (error) {
    console.error("Fel vid skapande av maskin:", error.message);
    return null;
  }
};

// ✅ Hämta alla maskiner
export const getMachines = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/machines`);
    console.log("Maskiner:", data);
    return data || [];
  } catch (error) {
    console.error("Fel vid hämtning av maskiner:", error.message);
    return null;
  }
};

// ✅ Hämta maskin via machineId
export const getMachineById = async (machineId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/machines/${machineId}`);
    console.log("Hämtad maskin:", data);
    return data;
  } catch (error) {
    console.error("Fel vid hämtning av maskin:", error.message);
    return null;
  }
};

// ✅ Uppdatera maskin
export const updateMachine = async (machineId, updatedMachine) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/machines/${machineId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMachine), // { name }
    });

    console.log("Uppdaterad maskin:", data.machine);
    return data.machine;
  } catch (error) {
    console.error("Fel vid uppdatering av maskin:", error.message);
    return null;
  }
};

// ✅ Ta bort maskin
export const deleteMachine = async (machineId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/machines/${machineId}`, {
      method: "DELETE",
    });
    console.log("Maskin borttagen:", data.message);
    return data;
  } catch (error) {
    console.error("Fel vid borttagning av maskin:", error.message);
    return null;
  }
};

// ✅ Låna maskin
export const borrowMachine = async (machineId, userId) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/machines/${machineId}/borrow`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );

    console.log("Maskin utlånad:", data.machine);
    return data.machine;
  } catch (error) {
    console.error("Fel vid utlåning av maskin:", error.message);
    return null;
  }
};

// ✅ Lämna tillbaka maskin
export const returnMachine = async (machineId) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/machines/${machineId}/return`,
      {
        method: "POST",
      }
    );

    console.log("Maskin återlämnad:", data.machine);
    return data.machine;
  } catch (error) {
    console.error("Fel vid återlämning av maskin:", error.message);
    return null;
  }
};

// ✅ Sök maskiner
export const searchMachines = async (query) => {
  if (!query.trim()) return [];

  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/machines/search?query=${query}`
    );
    return data.machines || [];
  } catch (error) {
    if (error.message.includes("404")) return [];
    console.error("Fel vid sökning av maskiner:", error.message);
    return null;
  }
};
