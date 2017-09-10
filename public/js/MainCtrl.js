angular.module('myApp').controller('MainCtrl', MainCtrl);
function MainCtrl($http) {
    var vm =this;
    $http.get("http://swapi-tpiros.rhcloud.com/films").then(function (response) {
        console.log(response);
        vm.films = response.data;
    });
}