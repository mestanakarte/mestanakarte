app.controller('ListController', ['$scope', '$rootScope', 'Places',
    function($scope, $rootScope, Places) {

    $scope.isEmpty = function() {
        if ($scope.places.length === 0) {
            return true;
        }
        return false;
    };

    $scope.confirm = function(place) {
        if (window.confirm('Remove?')) {
            $scope.delete(place);
        }
        /*var title = 'Confirm';
        var msg = 'Do you really want to delete this place?';
        var btns = [
            {result:'no', label: 'No'},
            {result:'yes', label: 'Yes', cssClass: 'btn-danger'}
        ];

        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function(result){
                if (result === 'yes') {
                    $scope.delete(place);
                }
            });*/
    };

    $scope.delete = function(place) {
        Places.delete(place);
    };

    $scope.show = function(place) {
        $rootScope.$broadcast('place:show', place);
    };
}]);
