//Import the model that loads planet data from planet-store JSON.
import { planetStoreModel } from "../models/planet-store.js";
//This controller handles requests to the Dashboard page.
export const dashboardController = {
  //This function runs when the dashboard route is requested.
  index(request, response) {
    //viewData passes data to handlebars view(dashboard.hbs).
    const viewData = {
      //Page title in the browser tab.
      title: "Steve's App-Planet Tracker",
      //Loads all planet data from JSON store.
      planets: planetStoreModel.getAllPlanets(),
    };
    //Renders the dashboard.hbs templater & pass on the data.
    response.render("dashboard", viewData);
  },
};