import axios from "axios";

const dbServer = "http://localhost:3000";

class Users {
  async createUser(user: { name: string; publicKey: string }) {
    axios.post(dbServer + "/users", user);
  }

  async getUser(key: string) {
    return axios.get(dbServer + `/users/${key}`);
  }
}

export const userModel = new Users();
