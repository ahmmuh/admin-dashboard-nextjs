import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { BASE_URL } from "./base_url";

// CREATE WORKPLACE (utan unit)
export const createWorkPlace = async (newWorkPlace) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/workplaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkPlace),
    });
    return data;
  } catch (error) {
    console.error("Error creating workplace:", error.message);
    return null;
  }
};

// ADD WORKPLACE TO UNIT
export const addWorkPlaceToUnit = async (unitId, newWorkPlace) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/units/${unitId}/workplaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkPlace),
    });
    return data;
  } catch (error) {
    console.error("Error adding workplace to unit:", error.message);
    return null;
  }
};

// GET ALL WORKPLACES
export const getAllWorkPlaces = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/workplaces`);
    return data;
  } catch (error) {
    console.error("Error fetching all workplaces:", error.message);
    return [];
  }
};

//Lägga användare på en arbetsplats:
export const assignUserToWorkPlace = async (workplaceId, userId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/workplaces/${workplaceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    return data;
  } catch (error) {
    console.error("Error assigning user to workplace:", error.message);
    return null;
  }
};

export const getNearbyWorkPlaces = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/workplaces/nearby`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    return data;
  } catch (error) {
    console.error("Error fetching nearby workplaces:", error.message);
    return [];
  }
};

// GET WORKPLACE BY ID
export const getWorkPlaceById = async (workplaceId) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/workplaces/${workplaceId}`);
    return data;
  } catch (error) {
    console.error("Error fetching workplace by ID:", error.message);
    return null;
  }
};

// UPDATE WORKPLACE
export const updateWorkPlace = async (workplaceId, updatedWorkplace) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/workplaces/${workplaceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkplace),
    });
    return data;
  } catch (error) {
    console.error("Error updating workplace:", error.message);
    return null;
  }
};

// DELETE WORKPLACE FROM UNIT
export const deleteWorkplace = async (unitId, workplaceId) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/units/${unitId}/workplaces/${workplaceId}`,
      {
        method: "DELETE",
      }
    );
    return data;
  } catch (error) {
    console.error("Error deleting workplace:", error.message);
    return null;
  }
};

//Ta bort tilldelade användare från en arbetsplats:

export const removeUserFromWorkPlace = async (workplaceId, userId) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/workplaces/${workplaceId}/users/${userId}`,
      {
        method: "DELETE", // vi använder PUT som i backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    return data; // innehåller message och uppdaterad workplace
  } catch (error) {
    console.error("Error removing user from workplace:", error.message);
    return null;
  }
};
