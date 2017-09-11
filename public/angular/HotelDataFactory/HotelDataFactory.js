angular.module('hotelApp').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http, $log) {
    return {
        hotelList: hotelList,
        hotelDisplay: hotelDisplay,
        postReview: postReview
    };

    function hotelList() {
        return $http.get('/api/hotels?count=10').then(complete).catch(failed);
    }

    function hotelDisplay(id) {
        return $http.get('/api/hotels/' + id).then(complete).catch(failed);

    }
    function postReview(id, review) {
        return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
    }
    function complete(response) {
        return response;
        //het volledig object terugvragen aub!
    }

    function failed(error) {
         $log.error(error.statusText);
    }
}