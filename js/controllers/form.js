app.controller('FormController'
    , ['$scope', '$rootScope', 'Places', '$routeParams', '$location'
    , function($scope, $rootScope, Places, $routeParams, $location) {
 
    $scope.place = {};
    $scope.isNew = true;
    $scope.saving = false;
    
    $rootScope.$on('map:pointSelected', function(event, data) {
        $scope.place.p_lat = data.p_lat;
        $scope.place.p_lng = data.p_lng;
    });
    
    
}]);