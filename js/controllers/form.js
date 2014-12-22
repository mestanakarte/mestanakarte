app.controller('FormController', ['$scope', '$rootScope', '$stateParams', '$state', 'Places',
    function($scope, $rootScope, $stateParams, $state, Places) {

    var placeId = $stateParams.placeId;
    var isEdit = Boolean(placeId);

    $scope.isNew = !isEdit;
    $scope.saving = false;
    if (isEdit) {
        Places.get({ id: placeId }).then(function (place) {
            $scope.place = place;
            origCoords.lat = place.lat;
            origCoords.lng = place.lng;
            $rootScope.$broadcast('place:edit', place);
        });
    } else {
        $scope.place = {};
    }
    var origCoords = {};

    $rootScope.$on('map:pointSelected', function(event, data) {
        $scope.$apply(function () {
            $scope.place.lat = data.lat;
            $scope.place.lng = data.lng;
        });
    });

    $scope.save = function () {
        $scope.saving = true;
        Places.save($scope.place).then(function (place) {
            $state.go('map.edit', { placeId: place.id });
            $rootScope.$broadcast('place:save', place);
        }).catch(function (error) {
            alert(error); // TODO: errors handling
        });
    };

    $scope.cancel = function (place) {
        place.lat = origCoords.lat;
        place.lng = origCoords.lng;
        $rootScope.$broadcast('place:cancelEdit', place);
        $state.go('map.list');
    };


}]);
