import { BASE_URL } from "./base_url";

export const getPlaces = async () => {
  try {
    const res = await fetch(`${BASE_URL}/places`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(`Error, status: ${res.status} TEXT: ${res.statusText}`);
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
