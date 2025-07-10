import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

export const createUnit = async (newUnit) => {
  try {
    const res = await fetch(`${BASE_URL}/units`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUnit),
    });
    if (!res.ok) {
      console.log(
        `Server error when creating a new unit data, status: ${res.status}`
      );
      return null;
    }
    console.log("NEw created unit", newUnit);
    return newUnit;
  } catch (error) {
    console.error("Error when creating a new unit", error.message);
    return null;
  }
};

export const getUnits = async () => {
  try {
    const res = await fetchWithAuth(`${BASE_URL}/units`, {
      credentials: "include",
      method: "GET",
    });
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
    const res = await fetch(`${BASE_URL}/units/${unitId}`, {
      method: "GET",
      credentials: "include",
    });
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

export const getWorkplace = async (unitId, workplaceId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/units/${unitId}/workplaces/${workplaceId}`,
      {
        method: "GET",
        credentials: "include",
        "Content-Type": "application/json",
      }
    );
    if (!response.ok) {
      console.warn(
        `Error - status: ${response.status}, message: ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error.message);
  }
};

//specialist operations
///units/:unitId/specialister/:specialistId

export const addSpecialistToUnit = async (unitId, newSpecialist) => {
  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/specialister`, {
      method: "PUT",
      credentials: "include",
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
  try {
    const res = await fetch(
      `${BASE_URL}/units/${unitId}/specialister/${specialistId}`,
      {
        method: "PUT",
        credentials: "include",
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
        credentials: "include",
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
        credentials: "include",
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

export const updateUser = async (userId, updatedUser) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
      console.error(
        `Fel vid uppdatering av chef. Status: ${res.status} (${res.statusText})`
      );
      return null;
    }

    const data = await res.json();

    console.log("Chefen har uppdaterats:", data);

    return data;
  } catch (error) {
    console.error(`Serverfel vid uppdatering av chef: ${error.message}`);
    return null;
  }
};

//add chef to enhet

export const addChefToUnit = async (unitId, newChef) => {
  console.log("📢 Skickar request till:", `${BASE_URL}/units/${unitId}/chefer`);
  console.log("📦 Med data:", newChef);

  try {
    const res = await fetch(`${BASE_URL}/units/${unitId}/chefer`, {
      method: "PATCH",
      credentials: "include",

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
        credentials: "include",
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
