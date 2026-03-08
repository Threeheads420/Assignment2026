//Import the file system module used to read files from the server.
import fs from "fs";

//load about page data from the json file.
const aboutStore = JSON.parse(
  fs.readFileSync("./models/about-store.json", "utf-8")
);
//This Model is used to provide About page data to the controller.
export const aboutStoreModel = {
  //Returns all About page information from the JSON data store.
  getAboutInfo() {
    return aboutStore;
  },
};