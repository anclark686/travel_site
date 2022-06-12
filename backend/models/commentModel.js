import db from "../config/database.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize;

const Comment = db.define('comments', {
    userId: {type: DataTypes.INTEGER},
    postId: {type: DataTypes.INTEGER},
    message: {type: DataTypes.STRING},
    replyMessageID: {type: DataTypes.INTEGER},

}, {
    freezeTableName: true
})

export default Comment