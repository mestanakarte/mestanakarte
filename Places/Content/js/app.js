window.app = angular.module('mestaApp', ['ui.router', 'ngResource']);

app.value('apiRoot', location.origin + '/api');

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: 'partials/map.html',
            controller: 'MapController'
        })
            // Places list and filter
            .state('map.list', {
                url: '/list?show', // show=placeId - highlight place
                templateUrl: 'partials/map.list.html',
                controller: 'ListController'
            })
            // Create
            .state('map.add', {
                url: '/add',
                templateUrl: 'partials/map.form.html',
                controller: 'FormController'
            })
            // Edit
            .state('map.edit', {
                url: '/edit/:placeId',
                templateUrl: 'partials/map.form.html',
                controller: 'FormController'
            });

    $urlRouterProvider.otherwise('/map/list');

}]);
