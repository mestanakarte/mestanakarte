app.controller('FormController', ['$scope', '$rootScope', '$stateParams', '$state', 'Places',
    function($scope, $rootScope, $stateParams, $state, Places) {

    var placeId = $stateParams.placeId;
    var isEdit = Boolean(placeId);

    $scope.place = {};
    $scope.isNew = !isEdit;
    $scope.saving = false;

    $rootScope.$on('map:pointSelected', function(event, data) {
        $scope.$apply(function () {
            $scope.place.lat = data.lat;
            $scope.place.lng = data.lng;
        });
    });

    $scope.save = function () {
        $scope.saving = true;
        Places.save($scope.place).then(function (place) {
            $state.go('map.edit', { placeId: place.id })
        }).catch(function (error) {
            alert(error); // TODO: errors handling
        })
    }


}]);
