import { BASE_URL } from "./base_url";

export const getAllKeys = async () => {
  try {
    const res = await fetch(`${BASE_URL}/keys`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Key data from getKeys ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching keys,", error.message);
    return null;
  }
};
