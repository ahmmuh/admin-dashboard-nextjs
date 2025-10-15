import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

// Hjälpfunktion för att hämta användarens aktuella position
const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("Geolocation stöds inte av din webbläsare.");
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err.message)
    );
  });

// Stämpla in
export const clockIn = async (lastFour) => {
  try {
    const coords = await getCurrentPosition();
    const location = {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    };

    const data = await fetchWithAuth(`${BASE_URL}/clocks/in`, {
      method: "POST",
      body: JSON.stringify({ lastFour, location }),
    });

    // console.log("Clocked in:", data);
    return data;
  } catch (error) {
    // console.error("Clock in error:", error.message);
    // Kasta vidare error till frontend
    throw error;
  }
};

// Stämpla ut
export const clockOut = async (lastFour) => {
  try {
    const coords = await getCurrentPosition();
    const location = {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    };

    const data = await fetchWithAuth(`${BASE_URL}/clocks/out`, {
      method: "POST",
      body: JSON.stringify({ lastFour, location }),
    });

    // console.log("Clocked out:", data);
    return data;
  } catch (error) {
    // console.error("Clock out error:", error.message);
    throw error;
  }
};

// Räkna hur många timmar man har jobbat per pass
export const getAllUserClocks = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/clocks/users`, {
      method: "GET",
    });

    // console.log("Clocks data from getAllUserClocks() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      // console.error("Error fetching clocks med användare,", error.message);
    }
    return null;
  }
};
