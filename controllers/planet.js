//Import the model that loads planet data from the planet-store JSON.
import { planetStoreModel } from "../models/planet-store.js";
//This controller that handles requests to individual planet detail pages.
export const planetController = {
    //This function runs when a specific planet route is requested (e.g. /planet/3).
  index(request, response) {
    //Gets the planet ID from the URL and retrieves the matching planet from the JSON store.
    const planet = planetStoreModel.getPlanetById(request.params.id);
    //viewData contains the data passed to the Handlebars view (planet.hbs).
    const viewData = {
      //Page title displayed in the browser tab.
      title: "Steve's App-Planet Details",
      //Passes the selected planet's data to the view.
      planet: planet,
    };
     //Render the planet.hbs template and pass the data to it.
    response.render("planet", viewData);
  },
};