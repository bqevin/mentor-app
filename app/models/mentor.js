// app/models/mentor.js

// define our mentor model
// module.exports allows us to pass this to other files when it is called

// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our mentor model
var mentorSchema = mongoose.Schema({

    local            : {
    	username 	 : String,
        email        : String,
        password     : String,
        dob			 : Date
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
mentorSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
mentorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for mentors and expose it to our app
module.exports = mongoose.model('Mentor', mentorSchema);