//This model loads info from the about-store JSON file.
import { aboutStoreModel } from "../models/about-store.js";
//This model loads the planet collection from the planet-store JSON file.
import { planetStoreModel } from "../models/planet-store.js";
//This model loads the moon collection from the moon-store JSON file.
import moonStore from "../models/moon-store.js";

//The controller that handles requests to the about page.
export const aboutController = {
  //This index function runs when the about route is requested.
  index(request, response) {
    //Gets all planet data from the planet store.
    const planets = planetStoreModel.getAllPlanets();
    //Gets all moon data from the moon store.
    const moons = moonStore.getAllMoons();

    //Counts how many planets are terrestrial planets.
    const terrestrialCount = planets.filter(planet => planet.type === "Terrestrial").length;
    //Counts how many planets are giant planets by subtracting terrestrial planets from the total.
    const giantCount = planets.length - terrestrialCount;

    //Contains the info passed to the handlebar view(about.hbs).
    const viewData = {
      //Page title in the browser tab.
      title: "Steve's About Page",
      //Spreads the about JSON content into the view data.
      ...aboutStoreModel.getAboutInfo(),
      //Adds a statistics object so the about page can display live app stats.
      stats: {
        //Total number of planets in the collection.
        totalPlanets: planets.length,
        //Total number of moons currently in the collection.
        totalMoons: moons.length,
        //Total number of terrestrial planets.
        terrestrialPlanets: terrestrialCount,
        //Total number of giant planets.
        giantPlanets: giantCount
      }
    };
    //Renders the about.hbs view & passes the data to the template(about.hbs).
    response.render("about", viewData);
  },
};