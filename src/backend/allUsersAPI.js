import { BASE_URL } from "./base_url";

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("users data from getAllUsers() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching users,", error.message);
    return null;
  }
};
