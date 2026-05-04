'use strict';

import moonStore from "../models/moon-store.js";
import logger from "../utils/logger.js";

export const moonController = {

  // Display all moons or filtered moons
  index(request, response) {
    let moons;

    if (request.query.search) {
  moons = moonStore.searchUserMoons(request.query.search, request.session.user.id);
} else {
  moons = moonStore.getUserMoons(request.session.user.id);
}

    const viewData = {
      title: "Moons",
      moons: moons,
      user: request.session.user
    };

    logger.info("moon list");
    response.render("moons", viewData);
  },

  // Show add form
  addForm(request, response) {
    const viewData = {
      title: "Add a Moon",
      error: request.query.error
    };
    response.render("add-moon", viewData);
  },

  // Add moon
  add(request, response) {
    if (!request.session.user) {
      return response.redirect("/login");
    }

    const existingMoon = moonStore.getUserMoons(request.session.user.id).find(
  moon => moon.name.toLowerCase() === request.body.name.toLowerCase()
);

    if (existingMoon) {
      return response.redirect("/moons/add?error=duplicate");
    }

    const newMoon = {
       userid: request.session.user.id,
      name: request.body.name,
      planet: request.body.planet,
      distance: request.body.distance,
      diameter: request.body.diameter,
      discoveredBy: request.body.discoveredBy,
      yearDiscovered: request.body.yearDiscovered,
      courtesy: request.body.courtesy,
      credit: request.body.credit,
      // Store the Cloudinary image URL instead of local file path
      image: request.file.path,
    };

    moonStore.addMoon(newMoon);
    logger.info("moon added");
    response.redirect("/moons");
  },

  // Delete moon
  delete(request, response) {
    if (!request.session.user) {
      return response.redirect("/login");
    }

    moonStore.deleteMoon(request.params.id);
    response.redirect("/moons");
  },

  // Show edit form
  editForm(request, response) {
    if (!request.session.user) {
      return response.redirect("/login");
    }

    const moon = moonStore.getMoonById(request.params.id);

    response.render("edit-moon", {
      title: "Edit Moon",
      moon: moon,
      user: request.session.user
    });
  },

  // Update moon
  update(request, response) {
    if (!request.session.user) {
      return response.redirect("/login");
    }

    const updatedMoon = {
      id: request.params.id,
      userid: request.session.user.id, 
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
  }

};