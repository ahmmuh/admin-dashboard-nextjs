// //Nyckel historik

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

// import { BASE_URL } from "./base_url";
// export const createApartment = async (newApartment) => {
//   try {
//     const res = await fetch(`${BASE_URL}/apartments`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newApartment),
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(
//         `Server error when creating a new apartment data, status: ${res.status}`
//       );
//       return null;
//     }
//     console.log("NEw created apartment", newApartment);
//     return newApartment;
//   } catch (error) {
//     console.error("Error when creating a new apartment", error.message);
//     return null;
//   }
// };

// export const getApartments = async () => {
//   console.log("Apartments i getApartments");
//   try {
//     const res = await fetch(`${BASE_URL}/apartments`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       if (res.status === 404) {
//         return [];
//       }
//       throw new Error(`HTTP Error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     console.log("Apartments i getApartments() ", data);
//     console.log("📦 Apartments res.status:", res.status);

//     return data;
//   } catch (error) {
//     if (error instanceof Error)
//       console.error("Error fetching Apartments,", error.message);
//     return null;
//   }
// };

// export const getApartmentByID = async (apartmentId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/apartments/${apartmentId}`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(
//         `Server error when fething APARTMENT data, status: ${res.status}`
//       );
//       return null;
//     }
//     const data = await res.json();
//     console.log("Hämtat APARTMENT data från servern ", data);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) console.error("Server Error: ", error.message);
//   }
// };

// export const updateApartment = async (apartmentId, updatedApartment) => {
//   try {
//     const res = await fetch(`${BASE_URL}/apartments/${apartmentId}`, {
//       method: "PATCH",
//       credentials: "include",

//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedApartment),
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error(
//         `Fel vid uppdatering av Apartment. Status: ${res.status} (${res.statusText})`
//       );
//       return null;
//     }
//     const data = await res.json();
//     console.log(
//       `UPDATED Apartment ) ${updatedApartment}  med ID ${apartmentId}`
//     );
//     return data;
//   } catch (error) {
//     console.error(`Error on the Server ${error.message}`);
//   }
// };

// export const deleteApartment = async (apartmentId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/apartments/${apartmentId}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     if (response.status === 401) {
//       return "unauthorized";
//     }
//     if (!response.ok) {
//       console.log(`Error deleting  (Apartment): ${response.status}`);
//       return;
//     }
//     const data = await response.json();
//     console.log(` (Apartment) deleted: ${data.message}`);
//   } catch (error) {
//     console.error("Error deleting  (Apartment):", error.message);
//   }
// };

// //Sök lägenhet

// export const searchApartments = async (query) => {
//   if (!query.trim()) return [];
//   const res = await fetch(
//     `${BASE_URL}/apartments/search?apartmentLocation=${query}`,
//     {
//       method: "GET",
//       credentials: "include",
//     }
//   );
//   const data = await res.json();

//   if (res.status === 401) {
//     return "unauthorized";
//   }
//   if (!res.ok) {
//     if (res.status === 404) {
//       return [];
//     }
//     throw new Error(data.message);
//   }

//   return data.data;
// };

// ✅ Skapa lägenhet
export const createApartment = async (newApartment) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/apartments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApartment),
    });

    console.log("Ny lägenhet skapad:", newApartment);
    return data;
  } catch (error) {
    console.error("Fel vid skapande av lägenhet:", error.message);
    return null;
  }
};

// ✅ Hämta alla lägenheter
export const getApartments = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/apartments`, {
      method: "GET",
    });

    console.log("Lägenheter:", data);
    return data;
  } catch (error) {
    console.error("Fel vid hämtning av lägenheter:", error.message);
    return null;
  }
};

// ✅ Hämta lägenhet via ID
export const getApartmentByID = async (apartmentId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/apartments/${apartmentId}`, {
      method: "GET",
    });

    console.log("Hämtad lägenhet:", data);
    return data;
  } catch (error) {
    console.error("Fel vid hämtning av lägenhet:", error.message);
    return null;
  }
};

// ✅ Uppdatera lägenhet
export const updateApartment = async (apartmentId, updatedApartment) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/apartments/${apartmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedApartment),
    });

    console.log("Uppdaterad lägenhet:", data);
    return data;
  } catch (error) {
    console.error("Fel vid uppdatering av lägenhet:", error.message);
    return null;
  }
};

// ✅ Ta bort lägenhet
export const deleteApartment = async (apartmentId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/apartments/${apartmentId}`, {
      method: "DELETE",
    });

    console.log("Lägenhet raderad:", data.message);
    return data;
  } catch (error) {
    console.error("Fel vid borttagning av lägenhet:", error.message);
  }
};

// ✅ Sök lägenheter
export const searchApartments = async (query) => {
  if (!query.trim()) return [];

  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/apartments/search?apartmentLocation=${query}`,
      {
        method: "GET",
      }
    );

    return data.data;
  } catch (error) {
    if (error.message.includes("404")) return [];
    console.error("Fel vid sökning av lägenheter:", error.message);
    return null;
  }
};
