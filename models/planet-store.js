//Import the file system module used to read files from the server.
import fs from "fs";
//Load the planet data from the planet-store JSON file.
const planetStore = JSON.parse(fs.readFileSync("./models/planet-store.json", "utf-8"));
//The model responsible for providing planet data to controllers.
export const planetStoreModel = {
  //This returns a list of all planets from the JSON data store.
  getAllPlanets() {
    return planetStore.planets;
  },
  //Finds and returns a single planet that matches the given id.
  getPlanetById(id) {
  return planetStore.planets.find((p) => p.id === id);
},
};