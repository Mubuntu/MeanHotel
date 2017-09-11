angular.module('myApp', ['ngRoute']).config(config);
function config($routeProvider) {
    $routeProvider.when('/films', {
        templateUrl: '../templates/main.htm',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    }).when('/films/:id', {
        templateUrl: '../templates/about.htm',
        controller: 'FilmCtrl',
        controllerAs: 'vm'
    })
        .otherwise({
            redirectTo:'/'
        });
    //$ python -m http.server 7070
}