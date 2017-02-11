// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var Mentor            = require('../app/models/mentor');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize mentors out of session

    // used to serialize the mentor for the session
    passport.serializeUser(function(mentor, done) {
        done(null, mentor.id);
    });

    // used to deserialize the mentor
    passport.deserializeUser(function(id, done) {
        Mentor.findById(id, function(err, mentor) {
            done(err, mentor);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // Mentor.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a Mentor whose email is the same as the forms email
        // we are checking to see if the Mentor trying to login already exists
        Mentor.findOne({ 'local.email' :  email }, function(err, mentor) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a mentor with that email
            if (mentor) {
                return done(null, false, req.flash('signupMessage', 'Mentor with that email exists.'));
            } else {

                // if there is no mentor with that email
                // create the mentor
                var newMentor            = new Mentor();

                // set the mentor's local credentials
                newMentor.local.email    = email;
                newMentor.local.password = newMentor.generateHash(password);
                newMentor.local.dob = req.body.dob;
                newMentor.local.username = req.body.username;


                // save the mentor
                newMentor.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newMentor);
                });
            }

        });    

        });

    }));

};