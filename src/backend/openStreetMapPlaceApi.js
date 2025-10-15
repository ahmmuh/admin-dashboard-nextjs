import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

export const getPlaces = async (query) => {
  if (!query) return [];
  try {
    const params = new URLSearchParams({ query }).toString();
    const data = await fetchWithAuth(`${BASE_URL}/places?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("SÖKTA PLATS DATA:", data);

    // OSM-data har redan { name, adress, coordinates }
    return data || [];
  } catch (error) {
    // console.error(`ServerFel: ${error.message}`);
    return [];
  }
};
