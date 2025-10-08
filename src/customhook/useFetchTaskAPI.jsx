// hooks/useFetchTask.js (eller .ts om du använder TypeScript)
import { useEffect, useState } from "react";
import { getAllKeys } from "@/backend/keyAPI";
import { getAllTasks } from "@/backend/taskApi";

export function useFetchTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const taskList = await getAllTasks();
      if (taskList.length === 0) {
        console.log("Tasks finns inte");
      }
      // console.log("Alla hämtade tasks", taskList);
      setTasks(taskList);
      setLoading(false);
    } catch (err) {
      console.error("Fel vid hämtning av tasks:", err.message);
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, fetchTasks, loading, error };
}
