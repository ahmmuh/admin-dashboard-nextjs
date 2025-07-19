export const fetchWithAuth = async (url, options = {}) => {
  const mergedOptions = {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(url, mergedOptions);

    if (res.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
