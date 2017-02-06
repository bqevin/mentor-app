// public/js/services/MentorService.js
angular.module('MentorService', []).factory('mentor', ['$http', function($http) {

    return {
        // call to get all mentors
        get : function() {
            return $http.get('/api/mentors');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new mentor
        create : function(mentorData) {
            return $http.post('/api/mentors', mentorData);
        },

        // call to DELETE a mentor
        delete : function(id) {
            return $http.delete('/api/mentors/' + id);
        }
    }       

}]);