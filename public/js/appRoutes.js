// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'MainController'
        })

        // mentors page that will use the MentorController
        .when('/mentors', {
            templateUrl: 'views/nerd.html',
            controller: 'MentorController'
        });

    $locationProvider.html5Mode(true);

}]);