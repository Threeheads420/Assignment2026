// Enables strict mode in JavaScript.
// This helps catch common coding mistakes and enforces safer coding practices.
'use strict';
// Imports the Express framework used to create the web server.
import express from 'express';
// Imports the application routes defined in routes.js.
// These routes connect URL paths to the appropriate controllers.
import routes from "./routes.js";
// Imports the logger utility used to record server activity.
// This allows messages such as server startup information to be logged.
import logger from "./utils/logger.js";
// Imports the create function from express-handlebars.
// This is used to configure the Handlebars view engine for rendering templates.
import { create } from 'express-handlebars';
// Creates the Express application.
const app = express();
// Defines the port number the server will run on.
const port = 3000;
// Serves static files from the "public" folder.
// This allows access to images, CSS, and client-side JavaScript.
app.use(express.static("public"));
// Creates the Handlebars engine with the .hbs file extension.
const handlebars = create({extname: '.hbs'});
// Registers Handlebars as the template engine.
app.engine(".hbs", handlebars.engine);
// Sets Handlebars as the default view engine for the application.
app.set("view engine", ".hbs");
// Registers the routes so the application knows how to respond to requests.
app.use("/", routes);
// Starts the server and listens on the specified port.
// A log message confirms that the server has started successfully.
app.listen(port, () => logger.info(`Your app is listening on port ${port}`));
