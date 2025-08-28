// import { getPlaces } from "@/backend/googlePlaceApi";

// export const fetchPlaces = async (query) => {
//   if (!query) return [];
//   try {
//     // if (!query) return;
//     const response = await getPlaces(query);
//     if (!response?.results) {
//       console.warn("Inga platser hittades eller fel i response ", response);
//       return [];
//     }
//     return response.results;
//   } catch (error) {
//     console.error("Error vid hämtning av platser", error.message);
//     return [];
//   }
// };
