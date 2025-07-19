import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";


export const getPlaces = async (query) => {
  try {
    const params = new URLSearchParams({ query }).toString();
    const data = await fetchWithAuth(`${BASE_URL}/places?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(`ServerFel: ${error.message}`);
    return null;
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/places/details/${placeId}`, {
      method: "GET",
    });
    return data;
  } catch (error) {
    console.error(`Serverfel ${error.message}`);
    return null;
  }
};

// import { BASE_URL } from "./base_url";

// export const getPlaces = async (query) => {
//   try {
//     const params = new URLSearchParams({ query }).toString();
//     const res = await fetch(`${BASE_URL}/places?${params}`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error("Error, ", res.status);
//       return null;
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(`ServerFel: ${error.message}`);
//   }
// };

// export const getPlaceDetails = async (placeId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/places/details/${placeId}`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error(`HTTP error: ${res.status} TEXT: ${res.statusText}`);
//       return null;
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(`Serverfel ${error.message}`);
//   }
// };
