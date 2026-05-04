import userStore from "../models/user-store.js";

const signup = {
  createUser(request, response) {
   const { firstName, lastName, email, password } = request.body;
if (password.length < 6) {
  return response.redirect("/signup?error=password");
}
    const existing = userStore.getUserByEmail(email);
    if (existing) {
      return response.redirect("/signup");
    }

    const user = {
  id: String(Date.now()),
  firstName,
  lastName,
  email,
  password
};

    userStore.addUser(user);
    response.redirect("/login");
  }
};

export default signup;