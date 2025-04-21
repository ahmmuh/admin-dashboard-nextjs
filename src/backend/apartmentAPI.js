//Nyckel historik

import { BASE_URL } from "./base_url";
export const createApartment = async (newApartment) => {
  try {
    const res = await fetch(`${BASE_URL}/apartments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApartment),
    });
    if (!res.ok) {
      console.log(
        `Server error when creating a new apartment data, status: ${res.status}`
      );
      return null;
    }
    console.log("NEw created apartment", newApartment);
    return newApartment;
  } catch (error) {
    console.error("Error when creating a new apartment", error.message);
    return null;
  }
};

export const getApartments = async () => {
  try {
    const res = await fetch(`${BASE_URL}/apartments`);
    if (!res.ok) {
      throw new Error(`HTTP Error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Apartments i getApartments() ", data);
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching Apartments,", error.message);
    return null;
  }
};

export const getApartmentByID = async (apartmentId) => {
  try {
    const res = await fetch(`${BASE_URL}/apartments/${apartmentId}`);
    if (!res.ok) {
      console.log(
        `Server error when fething APARTMENT data, status: ${res.status}`
      );
      return null;
    }
    const data = await res.json();
    console.log("Hämtat APARTMENT data från servern ", data);
    return data;
  } catch (error) {
    if (error instanceof Error) console.error("Server Error: ", error.message);
  }
};

export const deleteApartment = async (apartmentId) => {
  try {
    const response = await fetch(`${BASE_URL}/apartments/${apartmentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log(`Error deleting  (Apartment): ${response.status}`);
      return;
    }
    const data = await response.json();
    console.log(` (Apartment) deleted: ${data.message}`);
  } catch (error) {
    console.error("Error deleting  (Apartment):", error.message);
  }
};
