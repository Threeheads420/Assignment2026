 Planet Tracker

 Overview

Planet Tracker is a web application that allows users to explore the eight planets of our Solar System.  
The site presents a dashboard of all planets and individual pages containing key information such as distance from the Sun, number of moons, and orbital speed.

An About page explains the vast scale of the universe and how our Solar System fits within the Milky Way galaxy.

User authentication has been implemented using express-session. Users can sign up, log in, and log out, with protected routes ensuring only authenticated users can access certain features. Moon records are linked to individual users, meaning each user can only view and manage their own data.

---

 Pages

The application contains the following pages:

- **Home** – introduction to the Planet Tracker site  
- **Dashboard** – displays the eight planets with images and basic information  
- **Planet Details** – individual page for each planet with further facts  
- **About** – explains the scale of the universe using images and comparisons  
- **Login** – allows users to access their account  
- **Signup** – allows new users to register  
- **Moons** – displays moons added by the logged-in user  
- **Add Moon** – allows logged-in users to add moon records  

---

 How the Application Works

Planet data is stored in JSON files and loaded dynamically into the web pages.  
Controllers retrieve the data from the models and pass it to the Handlebars views, which render the pages seen in the browser.

Authentication is handled using sessions. When a user logs in, their details are stored in the session, and access to protected routes is controlled using middleware. Each moon is linked to a specific user via a unique user ID, ensuring that users only see and manage their own moons.

---

 Technologies Used

- Node.js  
- Express  
- Handlebars  
- JSON data stores  
- Fomantic UI  
- CSS  
- express-session  
- multer  
- uuid  

---

## Data and Image Sources

Planetary information and astronomical data are based on publicly available resources including NASA Solar System data.

Astronomy images used on the site are courtesy of NASA.

https://www.nasa.gov

---

 Author

Steven Condra  
SETU – Web App Development