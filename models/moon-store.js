'use strict';

import fs from "fs";

const file ="./models/moons.json";
const moonStore = {
  getAllMoons() {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
  },

  addMoon(moon) {
    const moons = this.getAllMoons();
    moon.id = String(moons.length + 1);
    moons.push(moon);
    fs.writeFileSync(file, JSON.stringify(moons, null, 2));
},

getMoonById(id) {
  const moons = this.getAllMoons();
  return moons.find((moon) => moon.id === id);
},
deleteMoon(id) {
  const moons = this.getAllMoons();
  const updatedMoons = moons.filter(moon => moon.id !== id);
  fs.writeFileSync(file, JSON.stringify(updatedMoons, null, 2));
},
updateMoon(updatedMoon) {
  const moons = this.getAllMoons();
  const index = moons.findIndex(moon => moon.id === updatedMoon.id);
  moons[index] = updatedMoon;
  fs.writeFileSync(file, JSON.stringify(moons, null, 2));
},
searchMoons(searchTerm) {
  const moons = this.getAllMoons();
  const term = searchTerm.trim().toLowerCase();

  return moons.filter(moon =>
    moon.name.toLowerCase().includes(term) ||
    moon.planet.toLowerCase().includes(term)
  );
},
getUserMoons(userid) {
  const moons = this.getAllMoons();
  return moons.filter(moon => moon.userid === userid);
},

searchUserMoons(searchTerm, userid) {
  const moons = this.getUserMoons(userid);
  const term = searchTerm.trim().toLowerCase();

  return moons.filter(moon =>
    moon.name.toLowerCase().includes(term) ||
    moon.planet.toLowerCase().includes(term)
  );
},
};
export default moonStore;
