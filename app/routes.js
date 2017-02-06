// app/routes.js

// grab the mentor model we just created
var Mentor = require('./models/mentor');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

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

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
