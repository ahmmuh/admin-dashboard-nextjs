import { BASE_URL } from "./base_url";

export const getAllKeys = async () => {
  try {
    const res = await fetch(`${BASE_URL}/keys`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Key data from getKeys ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching keys,", error.message);
    return null;
  }
};

///Get one key by it's ID

export const getKeyByID = async (keyId) => {
  try {
    const res = await fetch(`${BASE_URL}/keys/${keyId}`);
    if (!res.ok) {
      console.log(`Server error when fething KEY data, status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    console.log("Hämtat KEY data från servern ", data);
    return data;
  } catch (error) {
    if (error instanceof Error) console.error("Server Error: ", error.message);
  }
};

// Update key

export const updateKey = async (keyID, updatedKey) => {
  try {
    const res = await fetch(`${BASE_URL}/keys/${keyID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedKey),
    });
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av KEY. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(
      `NEW KEY (Nycklar) ${updatedKey} has been added to the KEY med ID ${keyID}`
    );
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};

// Delete key (Nyckel)

export const deleteKey = async (keyId) => {
  try {
    const response = await fetch(`${BASE_URL}/keys/${keyId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log(`Error deleting Key (nyckel): ${response.status}`);
      return;
    }
    const data = await response.json();
    console.log(`Key (nyckel) deleted: ${data.message}`);
  } catch (error) {
    console.error("Error deleting Key (nyckel):", error.message);
  }
};
