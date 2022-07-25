const express = require("express");
const cors = require("cors");
const db = require("./src/models");
const initRoutes = require("./src/routes/web");

const app = express();
app.use(cors()); 

global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
let port = 5000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
}); 