//Enables strict mode in JavaScript to help prevent common coding errors.
'use strict';
//Import LowDB database library.
import { Low } from "lowdb";
//Import JSON file adapter used to store the database in a JSON file.
import { JSONFile } from "lowdb/node";

//JsonStore class provides methods for reading and writing data to a JSON database.
class JsonStore {
  //Creates the database connection and loads the JSON file.
  constructor(file, defaults) {
    this.db = new Low(new JSONFile(file), defaults);
    this.db.read();
  }
  //Returns all items from a specified collection.
  findAll(collection) {
    return this.db.data[collection];
  }
  //Returns all items that match a given filter condition.
  findBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results;
  }
  //Returns the first item that matches a given filter condition.
  findOneBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results[0];
  }
  //Adds a new object to a collection and saves the database.
  async addCollection(collection, obj) {
    this.db.data[collection].push(obj);
    await this.db.write();
  }
  //Adds a new item to an array inside a collection object.
  async addItem(collection, id, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    data[0][arr].push(obj);
    await this.db.write();
  }
  //Removes an object from a collection.
  async removeCollection(collection, obj) {
    const index = this.db.data[collection].indexOf(obj);
    if (index > -1) {
      this.db.data[collection].splice(index, 1);
    }
    await this.db.write();
  }
  //Removes an item from an array inside a collection object.
  async removeItem(collection, id, arr, itemId) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    const item = data[0][arr].filter((i) => i.id === itemId);
    const index = data[0][arr].indexOf(item[0]);
    if (index > -1) {
      data[0][arr].splice(index, 1);
    }
    await this.db.write();
  }
  //Replaces an existing object in a collection with updated data.
  async editCollection(collection, id, obj) {
    let index = this.db.data[collection].findIndex((c) => c.id === id);
    if (index > -1) {
      this.db.data[collection].splice(index, 1, obj);
    }
    await this.db.write();
  }
  //Updates an item inside an array within a collection object.
  async editItem(collection, id, itemId, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    let index = data[0][arr].findIndex((i) => i.id === itemId);
    data[0][arr].splice(index, 1, obj);
    await this.db.write();
  }
}

//Export the JsonStore class so it can be used by other models.
export default JsonStore;

