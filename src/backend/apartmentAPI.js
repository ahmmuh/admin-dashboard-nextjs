// //Nyckel historik

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

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

    // console.log("Ny lägenhet skapad:", newApartment);
    return data;
  } catch (error) {
    // console.error("Fel vid skapande av lägenhet:", error.message);
    return null;
  }
};

// ✅ Hämta alla lägenheter
export const getApartments = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/apartments`, {
      method: "GET",
    });

    // console.log("Lägenheter:", data);
    return data;
  } catch (error) {
    // console.error("Fel vid hämtning av lägenheter:", error.message);
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
