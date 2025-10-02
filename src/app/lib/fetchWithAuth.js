// export const fetchWithAuth = async (url, options = {}) => {
//   const mergedOptions = {
//     ...options,
//     credentials: "include",
//     headers: {
//       ...options.headers,
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const res = await fetch(url, mergedOptions);

//     if (res.status === 401) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/login";
//       }
//       throw new Error("Unauthorized");
//     }

//     // Kontrollera content-type
//     const contentType = res.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       return await res.json();
//     } else {
//       // Om ingen JSON returneras, returnera bara status
//       return { status: res.status, statusText: res.statusText };
//     }
//   } catch (error) {
//     console.error("Fetch error:", error.message);
//     throw error;
//   }
// };

  import axios from "axios";

  export const fetchWithAuth = async (url, options = {}) => {
    try {
      const res = await axios({
        url,
        withCredentials: true, // motsvarar credentials: "include"
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        method: options.method || "GET",
        data: options.body ? JSON.parse(options.body) : undefined,
      });

      return res.data; // Axios returnerar redan JSON här
    } catch (error) {
      // Om 401 -> redirect
      if (error.response?.status === 401 && typeof window !== "undefined") {
        window.location.href = "/login";
      }

      // Hämta backend-meddelandet om det finns
      const msg =
        error.response?.data?.message || error.message || "Något gick fel";
      throw new Error(msg);
    }
  };
