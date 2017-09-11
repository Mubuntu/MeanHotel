angular.module('myApp').controller('FilmCtrl', FilmCtrl);
function FilmCtrl($routeParams,FilmFactory) {
    var vm =this;
    var id = $routeParams.id;
    FilmFactory.getOneFilm(id).then(function(response){
        vm.film = response;
    });
}