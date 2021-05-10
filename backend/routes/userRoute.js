import {signUp, getUser, logout} from "../controllers/userController.js";
import express from 'express'
import passport from "passport"
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import local from 'passport-local';

const router = express.Router()
const localStrategy = local.Strategy


passport.initialize()
passport.session()

    passport.use(
        new localStrategy({usernameField: 'email'}, (username, password, done) => {
            User.findOne({email: username}, (err, user) => {
                if (err) throw err;


                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result===true) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            })
        })
    )

    passport.serializeUser((user, done) => {
        console.log(user.email)
        done(null, user.email);
    })


    passport.deserializeUser((username, done) => {

        User.findOne({email: username}, (err, user) => {
            const userInformation = {
              username: user.email,
              fname: user.name,
              lname: user.surname
            };

            done(err, userInformation)
          });

         
    })


router.post('/login', (req, res, next) => {

    console.log(req.body)


    passport.authenticate('local', (err, user, info) => {
      if (err) throw err;

      if (!user) {res.send("Invalid");}
      else {
        req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Valid");
            console.log(req.user);
          });
      }
      

    })(req, res, next);
});


router.route('/getUser').get(getUser)

router.route('/logout').post(logout)

router.route('/register').post(signUp)

export default router