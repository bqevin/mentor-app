// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1640071739622731', 
        'clientSecret'  : 'fa69b9d6f818ab336ec9a547b599f7a9', 
        'callbackURL'   : 'http://localhost:2000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '823142948939-ro3tc5fo9ku61eir5rdpmu6lp2f807uf.apps.googleusercontent.com',
        'clientSecret'  : 't4c_4Wv9s8mm_PvDp4ZIlzLo',
        'callbackURL'   : 'http://localhost:2000/auth/google/callback'
    }

};