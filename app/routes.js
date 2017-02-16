// app/routes.js

// grab the mentor model we just created
var Mentor = require('./models/mentor');


module.exports = function(app, passport) {

    // sample api route
    app.get('/api/mentors', function(req, res) {
        // use mongoose to get all mentors in the database
        Mentor.find(function(err, mentors) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(mentors); // return all mentors in JSON format
        });
    });

    //Delete all mentors
    app.get('/api//mentors/delete/everything', function(req, res) {
        // use mongoose to get all mentors in the database
        Mentor.remove(function(err) {
           if (err)
                res.send(err);
            res.redirect('/api/mentors');
        });
        
    });
    

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index'); // 
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/mentor/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('views/register.ejs', { message: req.flash('loginMessage') }); 
    });

     // process the login form
    app.post('/mentor/getin', passport.authenticate('local-login', {
        successRedirect : '/mentor/profile', // redirect to the secure profile section
        failureRedirect : '/mentor/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/mentor/register', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('views/register.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/mentor/signup', passport.authenticate('local-signup', {
        successRedirect : '/mentor/profile', // redirect to the secure profile section
        failureRedirect : '/mentor/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/mentor/profile', isLoggedIn, function(req, res) {
        res.render('views/profile.ejs', {
            mentor : req.mentor // get the mentor out of session and pass to template
        });
    });


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/mentor/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/mentor/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/mentor/profile',
            failureRedirect : '/'
        }));
    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/mentor/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/mentor/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/mentor/profile',
                    failureRedirect : '/'
            }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on 
if (req.isAuthenticated())
    return next();

// if they aren't redirect them to the home page
res.redirect('/');
}
