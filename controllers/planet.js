import { planetStoreModel } from "../models/planet-store.js";
import moonStore from "../models/moon-store.js";

export const planetController = {
  index(request, response) {
    const planet = planetStoreModel.getPlanetById(request.params.id);

    const moonTotals = {
      Mercury: 0,
      Venus: 0,
      Earth: 1,
      Mars: 2,
      Jupiter: 95,
      Saturn: 146,
      Uranus: 27,
      Neptune: 14
    };

    const currentMoons = moonStore.getAllMoons().filter(
      moon => moon.planet === planet.name
    ).length;

    const totalMoons = moonTotals[planet.name] || 0;

    planet.moonStats = `${currentMoons}/${totalMoons}`;

    const viewData = {
      title: "Steve's App-Planet Details",
      planet: planet,
    };

    response.render("planet", viewData);
  },
};