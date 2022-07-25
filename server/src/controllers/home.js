const path = require("path");
const home = (req, res) => {
  return res.send("here be a backend");
};
module.exports = {
  getHome: home
};