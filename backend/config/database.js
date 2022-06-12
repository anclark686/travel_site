import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require("dotenv").config();

import { Sequelize } from "sequelize"


const db = new Sequelize('travelSite', 'root', process.env.DATABASE_PW, {
    host: 'localhost',
    dialect: 'mysql'
}); 

// const db = Mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'Saturn6Quality8Lovely6!',
//     database: 'travelSite'
// })

export default db;