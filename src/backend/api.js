const BASE_URL = "http://localhost:8000/api";

export const getUnits = async () => {
  try {
    const res = await fetch(`${BASE_URL}/units`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Unit data from getUnits ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching units,", error.message);
    return null;
  }
};

export const getUnitByID = async (unitId) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}`);
    if (!res.ok) {
      console.log(`Server error when fething data, status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    console.log("Hämtat data från servern ", data);
    return data;
  } catch (error) {
    if (error instanceof Error) console.error("Server Error: ", error.message);
  }
};

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

export const updateTask = async (unitId, taskId, newTask) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av task. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(
      `NEW TASK ${newChef} has been added to the UNIT med ID ${unitId}`
    );
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};

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
//specialist operations
///units/:unitId/specialister/:specialistId

export const addSpecialistToUnit = async (unitId, newSpecialist) => {
  console.log(
    "📢 Skickar request till:",
    `${BASE_URL}/units/${unitId}/specialister`
  );
  console.log("📦 Med data:", newSpecialist);

  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/specialister`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSpecialist),
    });
    console.log(
      "RESPONSE FROM SERVER i addSpecialistToUnit (frontend)",
      res.body
    );
    if (!res.ok) {
      console.error(
        `Error vid skapande av ny specialist status: ${res.status} message: ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    console.log(
      `New chef ${newSpecialist} has been added to enhet med ID ${unitId} `
    );
    return data;
  } catch (error) {
    console.error(`Fel vid skapande av ny chef error:  ${error.message}`);
  }
};
export const updateSpecialist = async (unitId, specialistId, newSpecialist) => {
  console.log(
    "Fetching:",
    `${BASE_URL}/units/${unitId}/specialister/${specialistId}`
  );

  try {
    const res = await fetch(
      `${BASE_URL}/units/${unitId}/specialister/${specialistId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpecialist),
      }
    );
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av specialist. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(
      `NEW SPECIALIST ${newSpecialist} has been added to the UNIT med ID ${unitId}`
    );
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};

export const deleteSpecialist = async (unitId, specialistId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/units/${unitId}/specialister/${specialistId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log(`Error deleting specialist: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log(`Specialist deleted: ${data.message}`);
  } catch (error) {
    console.error("Error deleting specialist:", error.message);
  }
};

export const deleteWorkplace = async (unitId, workplaceId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/units/${unitId}/workplaces/${workplaceId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log(`Error deleting workplace: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log(`Workplace deleted: ${data.message}`);
  } catch (error) {
    console.error("Error deleting workplace:", error.message);
  }
};

//chef operations

export const updateChef = async (unitId, chefId, newChef) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/chefer/${chefId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChef),
    });
    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av chef. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }
    const data = await res.json();
    console.log(
      `NEW CHEF ${newChef} has been added to the UNIT med ID ${unitId}`
    );
    return data;
  } catch (error) {
    console.error(`Error on the Server ${error.message}`);
  }
};

//add chef to enhet

export const addChefToUnit = async (unitId, newChef) => {
  console.log("📢 Skickar request till:", `${BASE_URL}/units/${unitId}/chefer`);
  console.log("📦 Med data:", newChef);

  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/chefer`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChef),
    });
    console.log("RESPONSE FROM SERVER", res.body);
    if (!res.ok) {
      console.error(
        `Error vid skapande av ny chef status: ${res.status} message: ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    console.log(
      `New chef ${newChef} has been added to enhet med ID ${unitId} `
    );
    return data;
  } catch (error) {
    console.error(`Fel vid skapande av ny chef error:  ${error.message}`);
  }
};

export const deleteChef = async (unitId, chefId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/units/${unitId}/chefer/${chefId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log(`Error deleting chef: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log(`chef deleted: ${data.message}`);
  } catch (error) {
    console.error("Error deleting chef:", error.message);
  }
};
