//Enables strict mode in JavaScript to enforce cleaner coding practices.
//Prevents the use of undeclared variables.
'use strict';
//Import the logger utility used to record messages in the server console.
import logger from "../utils/logger.js";
//Import the appStore model which provides general app information.
import appStore from "../models/app-store.js";
//The Controller that handles requests to the Home (start) page.
const start = {
  //This function runs when the root route is requested and loads the Home page.
  createView(request, response) {
     //Log a message to the server console when the start page loads.
    logger.info("Start page loading!");
    // viewData contains the data passed to the Handlebars view (start.hbs).
    const viewData = {
      //Page title displayed in the browser tab.
      title: " Steve's App-Home",
      //Loads application information from the app-store model.
      info: appStore.getAppInfo()
    };
      //Render the start.hbs template and pass the data to it.

    response.render('start', viewData);   
  },
};
// Export the controller so it can be used by the router.
export default start;
