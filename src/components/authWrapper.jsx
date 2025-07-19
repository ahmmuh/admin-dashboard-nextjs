export const fetchWithAuth = async (url, options = {}) => {
  const mergedOptions = {
    credentials: "include",
    ...options,
  };

  const res = await fetch(url, mergedOptions);

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const message = `HTTP error! status: ${res.status}`;
    throw new Error(message);
  }

  return res.json();
};
