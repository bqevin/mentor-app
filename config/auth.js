// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1640071739622731', // your App ID
        'clientSecret'  : 'fa69b9d6f818ab336ec9a547b599f7a9', // your App Secret
        'callbackURL'   : 'http://localhost:2000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};