angular.module('hotelApp', ['ngRoute'])

    .config(config)

//routing
function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angular/main/welcome.html'
        })
        .when('/hotels', {

            templateUrl: 'angular/hotel-list/Hotels.html',
            controller: HotelsController,
            controllerAs: 'vm'
        })

        .when('/hotel/:id', {
            templateUrl: 'angular/hotel-display/hotel.html',
            controller: HotelController,
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl: 'angular/register/register.html',
            controller: RegisterController,
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });

}

