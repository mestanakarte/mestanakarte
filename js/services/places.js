app.factory('Places', ['$http', function($http) {

    var service = {};

    service.getPlaces = function() {
        return $http({
            url: 'places.json',
            method: 'GET'
        });
    };
    /*$rootScope.places = [];
    function getPlaces(){
        $resource("/places.json").query(function(data) {
            $rootScope.places = data;
             console.log(data);
            $rootScope.$broadcast('places:updated');
        });
    }
    */

    service.get = function (id) {

    };

    service.add = function (place){

    };

    service.delete = function (place) {

    };

    return service;
}]);
