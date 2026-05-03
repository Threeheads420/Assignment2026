import userStore from "../models/user-store.js";

const signup = {
  createUser(request, response) {
    const { email, password } = request.body;

    const existing = userStore.getUserByEmail(email);
    if (existing) {
      return response.redirect("/signup");
    }

    const user = {
      id: String(Date.now()),
      email,
      password
    };

    userStore.addUser(user);
    response.redirect("/login");
  }
};

export default signup;