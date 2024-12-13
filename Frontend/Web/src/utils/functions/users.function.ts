import url from "../url";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getAll = async () => {
  try {
    const response = await fetch(`${url.current}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; 
  }
};
