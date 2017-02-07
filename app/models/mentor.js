// app/models/mentor.js

// grab the mongoose module
var mongoose = require('mongoose');

// define our mentor model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Mentor', {
    name : {type : String, default: ''}
});