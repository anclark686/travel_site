import db from "../config/database.js";
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';


//hash password
const hashPassword = (password) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    console.log(password)
    console.log(hash)
    return hash
}



const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

export { hashPassword, comparePassword }