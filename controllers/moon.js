'use strict';

//Imports the moon data store.
import moonStore from "../models/moon-store.js";
//Imports the logger for recording activity.
import logger from "../utils/logger.js";

//Controller for all moon related routes.
export const moonController = {

  //Displays all moons.
  index(request, response) {
    const moons = moonStore.getAllMoons();

    const viewData = {
      title: "Moons",
      moons: moons,
      user: request.session.user
    };

    logger.info("moon list");
    response.render("moons", viewData);
  },

  //Shows the add moon form only if user is logged in.
  addForm(request, response) {

    //Redirects to login if no user session exists.
   // if (!request.session.user) {
     // return response.redirect("/login");
      
        const viewData = {
      title: "Add a Moon",
      error: request.query.error
      
    };
    response.render("add-moon", viewData);
  },

  //Adds a new moon only if user is logged in.
  add(request, response) {

    //Checks user is logged in.
    if (!request.session.user) {
      return response.redirect("/login");
    }

    //Checks for duplicate moon names.
    const existingMoon = moonStore.getAllMoons().find(
      moon => moon.name.toLowerCase() === request.body.name.toLowerCase()
    );

    if (existingMoon) {
      return response.redirect("/moons/add?error=duplicate");
    }

    //Creates the new moon object from form data.
    const newMoon = {
      name: request.body.name,
      planet: request.body.planet,
      distance: request.body.distance,
      diameter: request.body.diameter,
      discoveredBy: request.body.discoveredBy,
      yearDiscovered: request.body.yearDiscovered,
      courtesy: request.body.courtesy,
      credit: request.body.credit,
      image: `/images/moons/${request.file.filename}`,
    };

    moonStore.addMoon(newMoon);
    logger.info("moon added");
    response.redirect("/moons");
  },

  //Deletes a moon only if user is logged in.
  delete(request, response) {

    if (!request.session.user) {
      return response.redirect("/login");
    }

    const id = request.params.id;
    moonStore.deleteMoon(id);

    response.redirect("/moons");
  },

  //Shows edit form only if logged in.
  editForm(request, response) {

    if (!request.session.user) {
      return response.redirect("/login");
    }

    const moon = moonStore.getMoonById(request.params.id);

    const viewData = {
      title: "Edit Moon",
      moon: moon,
       user: request.session.user
    };

    response.render("edit-moon", viewData);
  },

  //Updates moon only if logged in.
  update(request, response) {

    if (!request.session.user) {
      return response.redirect("/login");
    }

    //Builds updated moon object.
    const updatedMoon = {
      id: request.params.id,
      name: request.body.name,
      planet: request.body.planet,
      distance: request.body.distance,
      diameter: request.body.diameter,
      discoveredBy: request.body.discoveredBy,
      yearDiscovered: request.body.yearDiscovered,
      courtesy: request.body.courtesy,
      image: request.body.image,
    };

    moonStore.updateMoon(updatedMoon);

    response.redirect("/moons");
  },

  //Searches moons by name.
  search(request, response) {

    const searchTerm = request.body.searchTerm;
    const moons = moonStore.searchMoons(searchTerm);

    const viewData = {
      title: "Moons",
      moons: moons,
      user: request.session.user
    };

    response.render("moons", viewData);
  },

};