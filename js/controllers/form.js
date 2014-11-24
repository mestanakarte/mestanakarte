app.controller('FormController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

    $scope.place = {};
    $scope.isNew = true;
    $scope.saving = false;

    $rootScope.$on('map:pointSelected', function(event, data) {
        $scope.$apply(function () {
            $scope.place.lat = data.lat;
            $scope.place.lng = data.lng;
        });
    });


}]);
