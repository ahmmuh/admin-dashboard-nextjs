import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

// key with QR Code
export const registerNewKey = async (newKey) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/keys/qrcode`, {
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
// import { BASE_URL } from "./base_url";

// // key with QR Code
// export const registerNewKey = async (newKey) => {
//   try {
//     const res = await fetch(`${BASE_URL}/keys/qrcode`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newKey),
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(
//         `Server error when creating a new key data, status: ${res.status}`
//       );
//       return null;
//     }
//     console.log("NEw created key", newKey);
//     return newKey;
//   } catch (error) {
//     console.error("Error when creating a new key", error.message);
//     return null;
//   }
// };

// export const createNewKey = async (newKey) => {
//   try {
//     const res = await fetch(`${BASE_URL}/keys/add`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newKey),
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(
//         `Server error when creating a new key data, status: ${res.status}`
//       );
//       return null;
//     }
//     console.log("NEw created key", newKey);
//     return newKey;
//   } catch (error) {
//     console.error("Error when creating a new key", error.message);
//     return null;
//   }
// };

// export const getAllKeys = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/keys`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       throw new Error(`HTTP Error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     console.log("Key data from getKeys ", data);
//     return data;
//   } catch (error) {
//     if (error instanceof Error)
//       console.error("Error fetching keys,", error.message);
//     return null;
//   }
// };

// //Låna ut nyckel

// export const checkoutKey = async (userId, keyId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/keys/${keyId}/${userId}/checkout`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error(`Fel vid låning av nyckel. Status: ${res.status}`);
//       return null;
//     }

//     const data = await res.json();
//     console.log("Nyckel lånad:", data);
//     return data;
//   } catch (error) {
//     console.error("Error vid låning av nyckel:", error.message);
//   }
// };

// //Lämna nyckel tillbaka

// export const checkinKey = async (userId, keyId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/keys/${keyId}/${userId}/checkin`, {
//       method: "PATCH", // eller PATCH beroende på hur din backend funkar
//       credentials: "include",

//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error(
//         `Fel vid återlämning av nyckel. Status: ${res.status}, meddelande: ${res.statusText}`
//       );
//       return null;
//     }

//     const data = await res.json();
//     console.log("Nyckel återlämnad:", data);
//     return data;
//   } catch (error) {
//     console.error("Error vid återlämning av nyckel:", error.message);
//   }
// };

// //Nyckel historik

// export const getKeyLogs = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/logs`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       if (res.status === 400) {
//         return [];
//       }
//       throw new Error(`HTTP Error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     console.log("Key LOGS data from getKeyLogs ", data);
//     return data;
//   } catch (error) {
//     if (error) console.error("Error fetching keys,", error.message);
//     return null;
//   }
// };

// ///Get one key by it's ID

// export const getKeyByID = async (keyId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/keys/${keyId}`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(
//         `Server error when fething KEY data, status: ${res.status}, statusInfo: ${res.statusText}`
//       );
//       return null;
//     }
//     const data = await res.json();
//     console.log("Hämtat KEY data från servern ", data);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) console.error("Server Error: ", error.message);
//   }
// };

// // Update key

// export const updateKey = async (keyID, updatedKey) => {
//   try {
//     const res = await fetch(`${BASE_URL}/keys/${keyID}`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedKey),
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error(
//         `Fel vid uppdatering av KEY. Status: ${res.status} (${res.statusText})`
//       );
//       return null;
//     }
//     const data = await res.json();
//     console.log(
//       `NEW KEY (Nycklar) ${updatedKey} has been added to the KEY med ID ${keyID}`
//     );
//     return data;
//   } catch (error) {
//     console.error(`Error on the Server ${error.message}`);
//   }
// };

// // Delete key (Nyckel)

// export const deleteKey = async (keyId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/keys/${keyId}`, {
//       method: "DELETE",
//       credentials: "include",
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!response.ok) {
//       console.log(`Error deleting Key (nyckel): ${response.status}`);
//       return;
//     }
//     const data = await response.json();
//     console.log(`Key (nyckel) deleted: ${data.message}`);
//   } catch (error) {
//     console.error("Error deleting Key (nyckel):", error.message);
//   }
// };

// //Sök nycklar

// export const searchKeys = async (query) => {
//   if (!query.trim()) return [];
//   const res = await fetch(`${BASE_URL}/keys/search?keyLabel=${query}`, {
//     method: "GET",
//     credentials: "include",
//   });
//   if (res.status === 401) {
//     return "unauthorized";
//   }
//   if (!res.ok) {
//     if (res.status === 404) {
//       return [];
//     }
//     throw new Error(`HTTP Error! status: ${res.status}`);
//   }
//   const data = await res.json();
//   return data.data;
// };
