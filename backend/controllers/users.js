import User from '../models/userModel.js';
import { hashPassword, comparePassword } from "../auth/auth.js";


//user specific functions

//create user
export const createUser = async (req, res) => {
    
    const hashPass = hashPassword(req.body.password)
    //console.log(`old:${req.body.password}, new:${hashPass}`)
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
            profilePic: req.body.profilePic
        });
        //console.log(user.getDataValue())
        res.send("Values Inserted")
    } catch (err) {
        if (err.errors[0].path === "email_UNIQUE"){
            res.send("email")
        } else if (err.errors[0].path === "userName_UNIQUE") {
            res.send("username")
        } else res.send("other")

        console.log(err);

    }
}

// login user

export const loginUser = async (req, res) => {

    // passport.use(new LocalStrategy(
    //     function(username, password, done) {
    //       User.findOne({ username: username }, function (err, user) {
    //         if (err) { return done(err); }
    //         if (!user) { return done(null, false); }
    //         if (!user.verifyPassword(password)) { return done(null, false); }
    //         return done(null, user);
    //       });
    //     }
    // ));
    const user = await User.findOne({ where: {username: req.body.username}})
    console.log(req.body.username)
    if (user === null) {
        res.send("Not Found")
    } else {
        console.log("found")
        console.log(user.password)
        const passMatch = comparePassword(req.body.password, user.password)
        passMatch ? res.send("password valid") : res.send("password invalid")
    }

    


}




//change password

//update profile pic

//delete user