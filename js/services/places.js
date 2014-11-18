app.factory('Places', ['$http', '$rootScope', function($http, $rootScope){

    var service = {};
    
    service.getPlaces = function() {
        return $http({
            url: 'places.json',
            method: 'GET'
        })
    }
    /*$rootScope.places = [];
    function getPlaces(){    
        $resource("/places.json").query(function(data) {
            $rootScope.places = data;
             console.log(data);
            $rootScope.$broadcast('places:updated');
        });
    }
    */
    
    service.get = function(id){
    
    }
    
    service.add = function(place){
    
    }
    
    return service;
}]);