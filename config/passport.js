// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


// load up the user model
var Mentor            = require('../app/models/mentor');

//load the auth variables
var configAuth = require('./auth');

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



    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the mentor trying to login already exists
        Mentor.findOne({ 'local.email' :  email }, function(err, mentor) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no mentor is found, return the message
            if (!mentor)
                return done(null, false, req.flash('loginMessage', 'No mentor with the email address found')); // req.flash is the way to set flashdata using connect-flash

            // if the mentor is found but the password is wrong
            if (!mentor.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful mentor
            return done(null, mentor);
        });

    }));



    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the mentor in the database based on their facebook id
            Mentor.findOne({ 'facebook.id' : profile.id }, function(err, mentor) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the mentor is found, then log them in
                if (mentor) {
                    return done(null, mentor); // mentor found, return that mentor
                } else {
                    // if there is no user found with that facebook id, create them
                    var newMentor           = new Mentor();

                    // set all of the facebook information in our user model
                    newMentor.facebook.id    = profile.id; // set the users facebook id                   
                    newMentor.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newMentor.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newMentor.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newMentor.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newMentor);
                    });
                }

            });
        });

    }));


};