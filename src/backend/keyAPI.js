import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

// key with QR Code
export const AddNewKeyWithQrCode = async (newKey) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/keys/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newKey),
    });
    console.log("New created key", newKey);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error when creating a new key", error.message);
    return null;
  }
};

export const createNewKey = async (newKey) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/keys/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newKey),
    });
    console.log("New created key", newKey);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error when creating a new key", error.message);
    return null;
  }
};

export const getAllKeys = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/keys`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error fetching keys,", error.message);
    return null;
  }
};

// Låna ut nyckel
export const checkoutKey = async (userId, keyId) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/keys/${keyId}/${userId}/checkout`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Nyckel lånad:", data);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error vid låning av nyckel:", error.message);
    return null;
  }
};

// Lämna nyckel tillbaka
export const checkinKey = async (userId, keyId) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/keys/${keyId}/${userId}/checkin`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Nyckel återlämnad:", data);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error vid återlämning av nyckel:", error.message);
    return null;
  }
};

// Nyckel historik
export const getKeyLogs = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/logs`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error fetching keys,", error.message);
    return null;
  }
};

// Get one key by its ID
export const getKeyByID = async (keyId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/keys/${keyId}`);
    console.log("Hämtat KEY data från servern ", data);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Server Error: ", error.message);
    return null;
  }
};

// Update key
export const updateKey = async (keyID, updatedKey) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/keys/${keyID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedKey),
    });
    console.log(
      `NEW KEY (Nycklar) ${updatedKey} has been added to the KEY med ID ${keyID}`
    );
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error on the Server", error.message);
    return null;
  }
};

// Delete key (Nyckel)
export const deleteKey = async (keyId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/keys/${keyId}`, {
      method: "DELETE",
    });
    console.log(`Key (nyckel) deleted: ${data.message}`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error deleting Key (nyckel):", error.message);
    return null;
  }
};

// Sök nycklar
export const searchKeys = async (query) => {
  if (!query.trim()) return [];
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/keys/search?keyLabel=${query}`
    );
    return data.data || [];
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error searching keys:", error.message);
    return [];
  }
};
