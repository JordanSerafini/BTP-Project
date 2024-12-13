import { Group } from "../../pages/MessagePage/types/group.interface";
import { User } from "../../pages/MessagePage/types/user.interface";
import Cookies from "js-cookie";

const token = Cookies.get("token");
if (!token) {
  throw new Error("No token found in cookies");
}

const messagerieApi = {
  /**
   * Récupère tous les utilisateurs.
   * @returns {Promise<User[]>} 
   */
  async getAllUsers(): Promise<User[]> {
    if (!token) {
      throw new Error("No token found in cookies");
    }
    try {
      const response = await fetch("http://localhost:3000/messages/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Récupère tous les groupes d'utilisateurs.
   * @returns {Promise<Group[]>}
   */
  async getUserGroups(): Promise<Group[]> {
    try {
      const response = await fetch("http://localhost:3000/messages/groups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Group[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user groups:", error);
      throw error;
    }
  },
};

export default messagerieApi;
