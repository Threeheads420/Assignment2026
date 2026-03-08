//This model loads info from the about-store JSON file.
import { aboutStoreModel } from "../models/about-store.js";
//The controller that handles requests to the about page.
export const aboutController = {
  //This index function runs when the about route is requested.
  index(request, response) {
    //Contains the info passed to the handlebar view(about.hbs).
    const viewData = {
      //Page title in the browser tab.
      title: "Steve's App-About",
      ...aboutStoreModel.getAboutInfo(),
    };
    //Renders the about.hbs view & passes the data to the template(about.hbs).
    response.render("about", viewData);
  },
};