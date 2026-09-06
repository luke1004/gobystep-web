var app = angular.module('showbbs', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'MainController'
        })
        .when('/uploadFiles', {
            templateUrl: 'views/uploadFiles.html',
            controller: 'uploadFilesController'
        })
        .when('/message', {
            templateUrl: 'views/message.html',
            controller: 'MessageController'
        })
        .when('/newMessage', {
            templateUrl: 'views/newMessage.html',
            controller: 'NewMessageController'
        })
        .when('/showace', {
            templateUrl: 'views/showace.html',
            controller: 'MainController'
        })
        .when('/eQuicker24', {
            templateUrl: 'views/eQuicker24.html',
            controller: 'MainController'
        })
        .when('/fm', {
            templateUrl: 'views/fm.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
