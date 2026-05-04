// Enables strict mode in JavaScript.
// This helps catch common coding mistakes and prevents certain unsafe actions,
// making the code more reliable and easier to debug.
'use strict';

// Imports the Express framework so we can use its features.
// Express provides tools for building web servers, handling requests,
// and creating routes that respond to users visiting different URLs.
import express from 'express';

// Imports the custom logger utility used in the project.
// This logger records important events such as server activity,
// errors, and debugging information to help track what the application is doing.
// It is not used in this file because this module only defines routes.
import logger from "./utils/logger.js";

// Creates a new Express router.
// The router allows us to organise all page routes (URLs) in one place
// and connect them to the appropriate controller functions.
const router = express.Router();

function requireLogin(request, response, next) {
  if (!request.session.user) {
    return response.redirect("/login");
  }
  next();
}
// add your own routes below
// Import the controller for the home/start page
import start from './controllers/start.js';
// Import the controller responsible for displaying the dashboard page
// which shows the list of planets
import { dashboardController } from "./controllers/dashboard.js";
// Import the controller for the about page
// which provides information about the project
import { aboutController } from "./controllers/about.js";
// Import the controller used to display information about a single planet
import { planetController } from "./controllers/planet.js";
import { moonController } from "./controllers/moon.js";
import { upload } from "./multer-config.js";
import moonStore from "./models/moon-store.js";
import signup from "./controllers/signup.js";
import login from "./controllers/login.js";
// Route for the home page ("/").
// Calls the createView function in the start controller to display the welcome page.
router.get('/', start.createView);

// Route for the dashboard page.
// Displays the list of all planets using the dashboard controller.
router.get('/dashboard', dashboardController.index);

// Route for the about page.
// Displays information about the app and statistics.
router.get('/about', aboutController.index);

// Route for an individual planet page.
// ":id" is a route parameter used to identify which planet to display.
router.get("/planet/:id", planetController.index);

// Route for searching moons.
// Handles form submission and filters moons based on the search term entered by the user.
router.post("/moons/search", moonController.search);

// Route to display the edit form for a specific moon.
// ":id" identifies which moon is being edited.
router.get("/moons/edit/:id", moonController.editForm);

// Route to update a moon after editing.
// Receives updated data from the edit form and saves changes.
router.post("/moons/edit/:id", moonController.update);

// Route for the moons page.
// Displays all moons in the collection.
router.get("/moons", moonController.index);

// Route to display the add moon form.
// Allows the user to enter details for a new moon.
router.get("/moons/add", moonController.addForm);

// Route to handle adding a new moon.
// Uses multer to upload an image and saves the new moon to the collection.
router.post("/moons/add", upload.single("image"), moonController.add);
// Route to handle signup.
// Saves the new user details and redirects to login.
router.post("/signup", signup.createUser);

// Route for the login page.
// Renders the login form view.
router.get("/login", (request, response) => {
  response.render("login", { title: "Login", id: "login" });
});
// Route for the signup page.
// Renders the signup form view.
router.get("/signup", (request, response) => {
  response.render("signup", { title: "Sign Up", id: "signup" });
});


// Route to handle login.
// Processes the login form and authenticates the user.
router.post("/login", login.authenticate);

// Route to handle logout.
// Ends the user session and logs the user out.
router.get("/logout", login.logout);

// Route to delete a specific moon.
// ":id" identifies which moon is being deleted.
router.get("/moons/delete/:id", requireLogin, moonController.delete);

// Route to display details for a single moon.
// ":id" identifies which moon to display.
router.get("/moons/:id", function(req, res) {

  // Retrieves the selected moon using its ID.
  const moon = moonStore.getMoonById(req.params.id);

  // Creates a mapping of planet names to their corresponding planet page links.
  // This allows the moon page to link directly to the planet it orbits.
  const planetLinks = {
    Mercury: "/planet/1",
    Venus: "/planet/2",
    Earth: "/planet/3",
    Mars: "/planet/4",
    Jupiter: "/planet/5",
    Saturn: "/planet/6",
    Uranus: "/planet/7",
    Neptune: "/planet/8"
  };

   // Renders the moon detail page.
  // Passes the moon data and the corresponding planet link to the view.
  res.render("moon", {
    // Sets the page title to the moon’s name.
    title: moon.name,
    // Sends the selected moon object to the view for display.
    moon: moon,
    // Sends the correct planet link based on which planet the moon orbits.
    planetLink: planetLinks[moon.planet]
  });
  
});
// Export the router so it can be used by the main application
export default router;
