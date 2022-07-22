import { Sequelize } from "sequelize";

const db = new Sequelize('travelsite', 'root', 'Saturn6Quality8Lovely6!', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;