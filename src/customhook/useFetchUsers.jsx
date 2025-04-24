import { getAllUsers } from "@/backend/allUsersAPI";
import React, { useEffect, useState } from "react";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const userList = await getAllUsers();
      console.log("Users from useFetchUsers hook", userList);
      setUsers(userList);
      setLoading(false);
    } catch (error) {
      console.error("Error i useFetchUser hook");
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users };
};
