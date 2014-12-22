window.app = angular.module('mestaApp', ['ngRoute', 'ngResource']);

// Temporary solution for serverless development
var isTest = window.top && window.top.karma;
if (!isTest) {
    app.config(['PlacesProvider', function (PlacesProvider) {
        PlacesProvider.setUrlPattern('/mockapi/places:id.json');
    }]);
}

app.value('apiRoot', location.origin);

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
