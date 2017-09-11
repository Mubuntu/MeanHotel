angular.module('hotelApp').controller('HotelController', HotelController);

function HotelController($route,$routeParams, hotelDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    vm.isSubmitted = false;
    hotelDataFactory.hotelDisplay(id).then(function (response) {
        //console.log(id);
        //console.log(response.data);
        vm.hotel = response.data;
        vm.stars = _getStarRating(response.data.stars);

    });

    function _getStarRating(stars) {
        return new Array(stars);
    }

    vm.addReview = function() {
        var postData = {
            name: vm.name,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function(response) {
                if (response.status === 201) {
                    $route.reload();
                }
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };


}