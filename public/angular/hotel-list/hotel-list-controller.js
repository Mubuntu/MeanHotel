angular.module('hotelApp').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory, $log) {
    var vm = this;
    vm.title = 'MEAN Hotel APP';
    hotelDataFactory.hotelList().then(function (response) {
        //$log.log(response);
        vm.hotels = response.data;
        //$log.log(vm.hotels);
    });
}