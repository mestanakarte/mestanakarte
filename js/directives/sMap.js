app.directive('sMap', function($rootScope, Places){
    return {
        restrict: 'A',
        link: function($scope, element, attributes){
            
            ymaps.ready(init);

            function init () {
                 $scope.myMap = new ymaps.Map('map', {
                    center: [53.8992,27.5580],
                    zoom: 11
                });
                
   
                showMarkers();
                
                $scope.myMap.events.add('click', function(event){
                    var coords = event.get('coordPosition');
                    var x = coords[0];

                    $rootScope.$broadcast('map:pointSelected', {
                        p_lat : Math.round(coords[0] * 100) / 100,
                        p_lng : Math.round(coords[1] * 100) / 100
                    });
                });
            }
                
        
            function showMarkers(){
                $scope.places = [];
                Places.getPlaces().success(function(data){
                    $scope.places = data;
                    
                    angular.forEach(data, function(val){

                        var newPlacemark = new ymaps.Placemark([val.p_lng, val.p_lat], { 
                            hintContent: val.p_title, 
                            balloonContent: val.p_description 
                        });
                        
                        $scope.myMap.geoObjects.add(newPlacemark);
                    });

                    console.log(data);
                }).error(function(data){
                    console.log(data);
                });
            }
        }
    }
});