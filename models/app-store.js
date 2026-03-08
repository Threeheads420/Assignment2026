// Enables strict mode in JavaScript to help prevent common coding errors.
'use strict';
//Import the logger utility used for recording messages in the server console.
import logger from '../utils/logger.js';
//Import the JsonStore class used to read and write JSON data.
import JsonStore from './json-store.js';
//Model responsible for loading general application information.
const appStore = {
  //Create a JsonStore object linked to the app-store JSON file.
  store: new JsonStore('./models/app-store.json', { info: {} }),
  //Ths name of the collection inside the JSON file.
  collection: 'info',
  //The name of the array used in the JSON structure.
  array: 'creators',
  //This returns the application information from the JSON store.
  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default appStore;
