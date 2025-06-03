import { BASE_URL } from "./base_url";

export const signUp = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/users/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("Failed to register new user");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Serverfel ${error.message}`);
  }
};

export const signIn = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/users/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${res.message} || Failed to login`);
    }
    localStorage.setItem("userToken", data.token);
    console.log("User Data", user);
    return data;
  } catch (error) {
    throw new Error(`Serverfel ${error.message}`);
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Unauthorized");
    }

    const data = await res.json();
    console.log("Current User data", data);
    return data;
  } catch (error) {
    throw new Error(error.message || "Fel vid hämtning av användare");
  }
};
