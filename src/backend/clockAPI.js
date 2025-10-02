// import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
// import { BASE_URL } from "./base_url";

// // Hjälpfunktion för att hämta användarens aktuella position
// const getCurrentPosition = () =>
//   new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       return reject("Geolocation stöds inte av din webbläsare.");
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => resolve(pos.coords),
//       (err) => reject(err.message)
//     );
//   });

// // Stämpla in
// export const clockIn = async (lastFour) => {
//   try {
//     const coords = await getCurrentPosition();
//     const location = {
//       type: "Point",
//       coordinates: [coords.longitude, coords.latitude],
//     };

//     const data = await fetchWithAuth(`${BASE_URL}/clocks/in`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ lastFour, location }),
//     });

//     console.log("Clocked in:", data);
//     return data;
//   } catch (error) {
//     console.error("Error clocking in:", error);
//     return null;
//   }
// };

// // Stämpla ut
// export const clockOut = async (lastFour) => {
//   try {
//     const coords = await getCurrentPosition();
//     const location = {
//       type: "Point",
//       coordinates: [coords.longitude, coords.latitude],
//     };

//     const data = await fetchWithAuth(`${BASE_URL}/clocks/out`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ lastFour, location }),
//     });

//     console.log("Clocked out:", data);
//     return data;
//   } catch (error) {
//     console.error("Error clocking out:", error);
//     return null;
//   }
// };

// // Hämta alla användarens pass

// export const getUserClocks = async (lastFour) => {
//   try {
//     const data = await fetchWithAuth(`${BASE_URL}/clocks/user/${lastFour}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     console.log("User clocks:", data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching clocks:", error);
//     return null;
//   }
// };

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

    console.log("Clocked in:", data);
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

    console.log("Clocked out:", data);
    return data;
  } catch (error) {
    // console.error("Clock out error:", error.message);
    throw error;
  }
};
