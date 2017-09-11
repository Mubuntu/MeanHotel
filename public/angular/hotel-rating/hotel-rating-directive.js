/*
angular.module('hotelApp').directive('hotelRating', hotelRating);

//<hotel-rating> ← ← camelcase vormt zo om
function hotelRating() {
    return {
        restrict: 'E',//Element, Attribute
        template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star-empty"> {{star}}</span>',
        bindToController: true,
        controller: 'HotelController',
        controllerAs: 'vm',
        scope: {
            stars: '@'
        }

    }
}*/

angular.module('hotelApp').component('hotelRating', {
    bindings: {
        stars: '='
    },
    template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star-empty"> {{star}}</span>'
    , controller: 'HotelController',
    controllerAs: 'vm'
});
