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
// Route for the home page ("/")
// Calls the createView function in the start controller
router.get('/', start.createView);
// Route for the dashboard page
// Calls the dashboard controller to display all planets
router.get('/dashboard', dashboardController.index);
// Route for the about page
// Calls the about controller to display project information
router.get('/about', aboutController.index);
// Route for an individual planet page
// ":id" is a route parameter used to identify which planet to display
router.get("/planet/:id", planetController.index);
// Export the router so it can be used by the main application
router.post("/moons/search", moonController.search);
// Route for the moons page
router.get("/moons/edit/:id", moonController.editForm);
router.post("/moons/edit/:id", moonController.update);
router.get("/moons", moonController.index);
router.get("/moons/add", moonController.addForm);
router.post("/moons/add", upload.single("image"), moonController.add);
router.get("/signup", (request, response) => {
  response.render("signup", { title: "Sign Up", id: "signup" });
});

router.post("/signup", signup.createUser);

router.get("/login", (request, response) => {
  response.render("login", { title: "Login", id: "login" });
});


router.post("/login", login.authenticate);

router.get("/logout", login.logout);
router.get("/moons/delete/:id", moonController.delete);
router.get("/moons/:id", function(req, res) {
  const moon = moonStore.getMoonById(req.params.id);

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

  res.render("moon", {
    title: moon.name,
    moon: moon,
    planetLink: planetLinks[moon.planet]
  });
});

export default router;
