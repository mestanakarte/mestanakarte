window.app = angular.module('mestaApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/list', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    });

    $routeProvider.when('/add', {
        templateUrl: '/partials/form.html',
        controller: 'FormController'
    });

    $routeProvider.when('/edit/:placeId', {
        templateUrl: 'partials/form.html',
        controller: 'FormController'
    });

    $routeProvider.otherwise({
        redirectTo: 'list'
    });

}]);
