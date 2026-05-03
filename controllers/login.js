import userStore from "../models/user-store.js";

const login = {
  authenticate(request, response) {
    const { email, password } = request.body;

    const user = userStore.getUserByEmail(email);

    if (!user || user.password !== password) {
      return response.redirect("/login");
    }

    request.session.user = user;
    response.redirect("/dashboard");
  },

  logout(request, response) {
    request.session.destroy(() => {
      response.redirect("/");
    });
  }
};

export default login;