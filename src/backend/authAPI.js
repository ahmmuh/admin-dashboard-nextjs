import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

export const signUp = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/users/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Kunde inte registrera ny användare");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signIn = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/users/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${res.message} || Failed to login`);
    }
    console.log("User Data", user);
    return data;
  } catch (error) {
    throw new Error(`Serverfel ${error.message}`);
  }
};

// Logout
export const logout = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/users/auth/logout`, {
      method: "POST",
    });

    console.log("Logout successful");
    return data;
  } catch (error) {
    throw new Error(`Logout-fel: ${error.message}`);
  }
};

// Current user
export const getCurrentUser = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("Current User data", data);
    return data;
  } catch (error) {
    throw new Error(error.message || "Fel vid hämtning av användare");
  }
};

//Kommenterat bort
//Logout

// export const logout = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/users/auth/logout`, {
//       method: "POST",
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       throw new Error(data.message || "Failed to logout");
//     }
//     const data = await res.json();

//     console.log("Logout successful");
//     return data;
//   } catch (error) {
//     throw new Error(`Logout-fel: ${error.message}`);
//   }
// };

// //Current user
// export const getCurrentUser = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/users/me`, {
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
//       const errorData = await res.json();
//       throw new Error(errorData.message || "Unauthorized");
//     }

//     const data = await res.json();
//     console.log("Current User data", data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message || "Fel vid hämtning av användare");
//   }
// };
