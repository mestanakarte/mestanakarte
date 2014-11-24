app.directive('sMap', ['$rootScope', 'Places',
    function($rootScope, Places){
        return {
            restrict: 'A',
            link: function($scope){

                ymaps.ready(init);

                function init () {
                     $scope.myMap = new ymaps.Map('map', {
                        center: [53.8992,27.5580],
                        zoom: 11
                    });


                    showMarkers();

                    $scope.myMap.events.add('click', function(event){
                        var coords = event.get('coordPosition');

                        $rootScope.$broadcast('map:pointSelected', {
                            lat : Math.round(coords[0] * 100) / 100,
                            lng : Math.round(coords[1] * 100) / 100
                        });
                    });
                }


                function showMarkers(){
                    $scope.places = [];
                    Places.getPlaces().success(function(data){
                        $scope.places = data;

                        angular.forEach(data, function(val){

                            var newPlacemark = new ymaps.Placemark([val.lng, val.lat], {
                                hintContent: val.title,
                                balloonContent: val.description
                            });

                            $scope.myMap.geoObjects.add(newPlacemark);
                        });

                        console.log(data);
                    }).error(function(data){
                        console.log(data);
                    });
                }
            }
        };
}]);
