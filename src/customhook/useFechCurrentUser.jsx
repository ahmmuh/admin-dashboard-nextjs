import { useEffect, useState } from "react";
import { getCurrentUser } from "@/backend/authAPI";

export function useFetchCurrentUser() {
  const [currentUser, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      if (!user || Object.keys(user).length === 0) {
        console.log("Ingen användare hittades eller objektet är tomt.");
      }
      console.log("Hämtad user i fetchCurrentUser", user);
      setUser(user);
      console.log("Hämtad user i fetchCurrentUser", user);
    } catch (err) {
      console.error("Fel vid hämtning av user:", err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return { currentUser, loading, error };
}
