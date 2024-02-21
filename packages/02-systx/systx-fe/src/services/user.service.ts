import { User as UserModel, UserInput } from "../models/user.model"

class User {
  // static means that are called on runtime
  static login(username: string, password: string) {
    return fetch("htp://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "content-type": "application/json",
      }
    }).then(response => {
      if (response.status >= 400) {
        return Promise.reject(response)
      }

      return response.json() as Promise<UserModel>
    })
  }

  static register(userInput: UserInput) {
    return fetch("htp://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify({
        username: userInput.username,
        password: userInput.password,
        name: userInput.name,
        balance: 1000
      }),
      headers: {
        "content-type": "application/json",
      }
    }).then(response => {
      if (response.status >= 400) {
        return Promise.reject(response)
      }

      return response.json() as Promise<UserModel>
    })
  }
}

export default User;
