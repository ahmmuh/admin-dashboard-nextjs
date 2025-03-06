import { BASE_URL } from "./base_url";

//task operations
export const getUnitTasks = async (unitId) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/tasks`);
    if (!res.ok) {
      console.log(`Server error when fething data, status: ${res.status}`);
      return null;
    }
    const tasks = await res.json();
    console.log("Hämtat tasks från servern ", tasks);
    return tasks;
  } catch (error) {
    if (error instanceof Error) console.error("Server Error: ", error.message);
  }
};

//Tilldela task med Barre
export const assignTaskToUnit = async (unitId, taskId, assignedTask) => {
  try {
    const res = await fetch(
      `${BASE_URL}/units/${unitId}/tasks/${taskId}/assign`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignedTask),
      }
    );
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av task. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(`Tilldelad ${assignedTask} Utförs av enhet med ID ${unitId}`);
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};
//update task

export const updateTask = async (unitId, taskId, newTask) => {
  try {
    const res = await fetch(
      `${BASE_URL}/units/${unitId}/tasks/${taskId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }
    );
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av task. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(
      `NEW TASK ${newTask} has been added to the UNIT med ID ${unitId}`
    );
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};
//GET TASK STATUS
export const getTaskStatuses = async (unitId) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/tasks/statuses`);
    if (!res.ok) {
      console.log(
        `Ingen response vid hämtning av status: status: ${res.status} status Text: ${res.statusText}`
      );
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`Server Error message: ${error.message}`);
    return null;
  }
};

// DELETE TASK

export const deleteTask = async (unitId, taskId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/units/${unitId}/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log(`Error deleting task: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log(`Task deleted: ${data.message}`);
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
};
