import { useEffect, useState } from "react";
import { getCurrentUser } from "@/backend/authAPI";

export function useFetchCurrentUser() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.log("user finns inte");
      }
      console.log("Hämtad user", user);
      setUser(user);
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

  return { user, loading, error };
}
