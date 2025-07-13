import { BASE_URL } from "./base_url";

export const getUserById = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log(`Server error when fetching data, status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    console.log("Hämtat data från servern: ", data);

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server Error:", error.message);
    }
    return null;
  }
};
