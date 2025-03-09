import { BASE_URL } from "./base_url";

export const getPlaces = async (query) => {
  try {
    const params = new URLSearchParams({ query }).toString();
    const res = await fetch(`${BASE_URL}/places?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("Error, ", res.status);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`ServerFel: ${error.message}`);
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const res = await fetch(`${BASE_URL}/places/details/${placeId}`);
    if (!res.ok) {
      console.error(`HTTP error: ${res.status} TEXT: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Serverfel ${error.message}`);
  }
};
