const fs = require("fs");
const db = require("../models");
const Image = db.images;
const uploadFiles = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      username: req.body.userName,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/uploads/" + req.file.filename
      ),
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
    }).then((image) => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
module.exports = {
  uploadFiles,
};