import db from "../config/database.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize;

const Post = db.define('posts', {
    userId: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING},
    location: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
}, {
    freezeTableName: true
})

export default Post