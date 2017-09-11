angular.module('myApp').controller('MainCtrl', MainCtrl);
function MainCtrl(FilmFactory) {
    var vm =this;
    vm.name = 'Patrick Frison';
     FilmFactory.getAllFilms().then(function (response) {
         vm.films = response;
     });
    vm.date1= '12 February 2016';
    vm.date2= '25 February 2018';
    vm.date3= '11 September 2001';
    vm.date4= '11 April 2002';
    vm.date5= '12 March 2017';

}