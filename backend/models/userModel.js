import db from "../config/database.js"
import { Sequelize } from "sequelize"


const { DataTypes } = Sequelize;

const User = db.define('users', {
    firstName: {
        type: DataTypes.STRING, 
        validate: {
            is: ["[a-z]",'i'],    // will only allow letters
            max: 50
        }
    },
    lastName: {
        type: DataTypes.STRING, 
        validate: {
            is: ["[a-z]",'i'],    // will only allow letters
            max: 50
        }
    },
    username: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    profilePic: {type: DataTypes.STRING}

}, {
    freezeTableName: true,
}) 




export default User