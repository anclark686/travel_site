const db = require("../models");
const imageModel = require("../models/image.model");
const Image = db.images;

const gallery = async (req, res) => {
    try {
        const images = await Image.findAll()
        // images.map((val, key) => {
        //     console.log(val.title)
        //     val.title = val.title + "hello"
        //   })
        images.map((val, key) => {
            console.log(val.title)
          })
        res.send(images)
    } catch (error) {
        console.log(error)
        return res.send('No images found')
    }

}

module.exports = {
    gallery,
}