import userStore from "../models/user-store.js";

const login = {

  // Handles login form submission
  authenticate(request, response) {

    // Gets email and password from the form
    const { email, password } = request.body;

    // Finds the user in the data store by email
    const user = userStore.getUserByEmail(email);

    // If user not found OR password doesn't match, send back to login page
    if (!user || user.password !== password) {
      return response.redirect("/login");
    }

    // Stores the logged-in user in the session
    request.session.user = user;

    // Saves the session BEFORE redirecting
    // This prevents the session being lost on the next request
    request.session.save(() => {
      response.redirect("/dashboard");
    });
  },

  // Logs the user out
  logout(request, response) {

    // Destroys the session (removes logged-in user)
    request.session.destroy(() => {

      // Redirects to home page after logout
      response.redirect("/");
    });
  }
};

export default login;