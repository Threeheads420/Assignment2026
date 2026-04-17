'use strict';

import moonStore from "../models/moon-store.js";
import logger from "../utils/logger.js";

export const moonController = {

  index(request, response) {
    const moons = moonStore.getAllMoons();
    const viewData = {
      title: "Moons",
      moons: moons,
    };
    logger.info("moon list");
    response.render("moons", viewData);
  },

  addForm(request, response) {
    const viewData = {
      title: "Add a Moon",
    };
    response.render("add-moon", viewData);
  },

  add(request, response) {

    const existingMoon = moonStore.getAllMoons().find(
      moon => moon.name.toLowerCase() === request.body.name.toLowerCase()
    );

    if (existingMoon) {
      return response.send("Moon already exists");
    }

    const newMoon = {
      name: request.body.name,
      planet: request.body.planet,
      distance: request.body.distance,
      diameter: request.body.diameter,
      discoveredBy: request.body.discoveredBy,
      yearDiscovered: request.body.yearDiscovered,
      courtesy: request.body.courtesy,
      image: `/images/moons/${request.file.filename}`,
    };

    moonStore.addMoon(newMoon);
    logger.info("moon added");
    response.redirect("/moons");
  },
delete(request, response) {
  const id = request.params.id;
  moonStore.deleteMoon(id);
  response.redirect("/moons");
},
editForm(request, response) {
  const moon = moonStore.getMoonById(request.params.id);
  const viewData = {
    title: "Edit Moon",
    moon: moon,
  };
  response.render("edit-moon", viewData);
},
update(request, response) {
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
search(request, response) {
  const searchTerm = request.body.searchTerm;
  const moons = moonStore.searchMoons(searchTerm);

  const viewData = {
    title: "Moons",
    moons: moons,
  };

  response.render("moons", viewData);
},
};