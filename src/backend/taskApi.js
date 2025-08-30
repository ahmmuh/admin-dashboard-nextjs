import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

export const addTask = async (newTask) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    return data; // här har du redan JSON
  } catch (error) {
    console.error("Fel vid skapande av uppdrag:", error.message);
    throw error;
  }
};

export const getUnitTasks = async (unitId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/units/${unitId}/tasks`);
    console.log("Hämtat tasks från servern ", data);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Server Error: ", error.message);
    return null;
  }
};

export const getAllTasks = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/tasks`);
    console.log("Hämtat tasks från servern ", data);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Server Error: ", error.message);
    return null;
  }
};

// Tilldela task med Barre
export const assignTaskToUnit = async (unitId, taskId, assignedTask) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/units/${unitId}/tasks/${taskId}/assign`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignedTask),
      }
    );
    console.log(`Tilldelad ${data} Utförs av enhet med ID ${unitId}`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error(`Error on the Server ${error.message}`);
    return null;
  }
};

// Update task
export const updateTask = async (taskId, newTask) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    console.log(`NEW TASK ${newTask} has been added to the UNIT med ID `);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error(`Error on the Server ${error.message}`);
    return null;
  }
};

// GET TASK STATUS
export const getTaskStatuses = async (unitId) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/units/${unitId}/tasks/statuses`
    );
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.warn(`Server Error message: ${error.message}`);
    return null;
  }
};

// DELETE TASK
export const deleteTask = async (taskId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    console.log(`Task deleted: ${data.message}`);
    return data;
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    console.error("Error deleting task:", error.message);
    return null;
  }
};

// Sök tasks
export const searchTasks = async (query) => {
  if (!query.trim()) return [];
  try {
    const data = await fetchWithAuth(`${BASE_URL}/tasks/search?title=${query}`);
    return data || [];
  } catch (error) {
    if (error.message.includes("401")) return "unauthorized";
    if (error.message.includes("404")) return [];
    console.error("Error searching tasks:", error.message);
    return [];
  }
};

// import { BASE_URL } from "./base_url";

// //task operations

// //add new task to unit

// export const addNewTask = async (newTask) => {
//   try {
//     const res = await fetch(`${BASE_URL}/tasks/add`, {
//       method: "POST",
//       credentials: "include",

//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newTask),
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }

//     if (!res.ok) {
//       console.error(`Error meddelande vid skapandet av ny uppgift
//         status: ${res.status} meddelande: ${res.statusText}`);
//       return null;
//     }
//     const data = await res.json();
//     console.log(`Uppdaterad enhet med ny task`, data);
//     return data;
//   } catch (error) {
//     console.error(
//       `Serverfle vid uppdatering av enhet med ny task, Meddelande: ${error.message}`
//     );
//     return null;
//   }
// };
// export const getUnitTasks = async (unitId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/units/${unitId}/tasks`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(`Server error when fething data, status: ${res.status}`);
//       return null;
//     }
//     const tasks = await res.json();
//     console.log("Hämtat tasks från servern ", tasks);
//     return tasks;
//   } catch (error) {
//     if (error instanceof Error) console.error("Server Error: ", error.message);
//   }
// };

// export const getAllTasks = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/tasks`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(`Server error when fething data, status: ${res.status}`);
//       return null;
//     }
//     const tasks = await res.json();
//     console.log("Hämtat tasks från servern ", tasks);
//     return tasks;
//   } catch (error) {
//     if (error instanceof Error) console.error("Server Error: ", error.message);
//   }
// };
// //Tilldela task med Barre
// export const assignTaskToUnit = async (unitId, taskId, assignedTask) => {
//   try {
//     const res = await fetch(
//       `${BASE_URL}/units/${unitId}/tasks/${taskId}/assign`,
//       {
//         method: "PATCH",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(assignedTask),
//       }
//     );
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error(
//         `Fel vid uppdatering av task. Status: ${res.status} (${res.statusText})`
//       );
//       return null;
//     }
//     const data = await res.json();
//     console.log(`Tilldelad ${data} Utförs av enhet med ID ${unitId}`);
//     return data;
//   } catch (error) {
//     console.error(`Error on the Server ${error.message}`);
//   }
// };
// //update task

// export const updateTask = async (taskId, newTask) => {
//   try {
//     const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newTask),
//     });

//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.error(
//         `Fel vid uppdatering av task. Status: ${res.status} (${res.statusText})`
//       );
//       return null;
//     }
//     const data = await res.json();
//     console.log(`NEW TASK ${newTask} has been added to the UNIT med ID `);
//     return data;
//   } catch (error) {
//     console.error(`Error on the Server ${error.message}`);
//   }
// };
// //GET TASK STATUS
// export const getTaskStatuses = async (unitId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/units/${unitId}/tasks/statuses`, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (res.status === 401) {
//       return "unauthorized";
//     }
//     if (!res.ok) {
//       console.log(
//         `Ingen response vid hämtning av status: status: ${res.status} status Text: ${res.statusText}`
//       );
//       return null;
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.warn(`Server Error message: ${error.message}`);
//     return null;
//   }
// };

// // DELETE TASK

// export const deleteTask = async (taskId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     if (response.status === 401) {
//       return "unauthorized";
//     }

//     if (!response.ok) {
//       console.log(`Error deleting task: ${response.status}`);
//       return;
//     }

//     const data = await response.json();
//     console.log(`Task deleted: ${data.message}`);
//   } catch (error) {
//     console.error("Error deleting task:", error.message);
//   }
// };

// //Sök tasks

// export const searchTasks = async (query) => {
//   if (!query.trim()) return [];
//   const res = await fetch(`${BASE_URL}/tasks/search?title=${query}`, {
//     method: "GET",
//     credentials: "include",
//   });
//   const data = await res.json();
//   if (response.status === 401) {
//     return "unauthorized";
//   }
//   if (!res.ok) {
//     if (res.status === 404) {
//       return [];
//     }
//     throw new Error(`HTTP Error! status: ${res.status}`);
//   }
//   return data.data;
// };
