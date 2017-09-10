angular.module('myApp', ['ngRoute']).config(config);
function config($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: '../templates/main.htm',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    }).when('/about', {
        templateUrl: '../templates/about.htm',
        controller: 'AboutController',
        controllerAs: 'vm'
    })
        .otherwise({
            redirectTo:'/'
        });
    //$ python -m http.server 7070
}