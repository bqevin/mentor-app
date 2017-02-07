// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '../index.html',
            controller: 'MainController'
        })
        // Login page
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'LoginController'
        })

        // Register page
        .when('/register', {
            templateUrl: '../views/register.html',
            controller: 'RegisterController'
        })

        // mentors page that will use the MentorController
        .when('/mentors', {
            templateUrl: '../views/mentors.html',
            controller: 'MentorController'
        });

    $locationProvider.html5Mode(true);

}]);