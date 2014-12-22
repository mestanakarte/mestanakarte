app.directive('ymap', ['$rootScope',
	function($rootScope){
		return {
			restrict: 'E',
			scope: {
				placemarks: '='
			},
			link: function($scope, element, attr){
				var map;
				ymaps.ready(init);

				element.css({
					width: attr.width + 'px',
					height: attr.height + 'px'
				});

				function init () {
					map = new ymaps.Map(element[0], {
						center: [53.8992,27.5580],
						zoom: 11
					});

					map.events.add('click', function(event){
						var coords = event.get('coordPosition');

						$rootScope.$broadcast('map:pointSelected', {
							lat : Math.round(coords[0] * 100) / 100,
							lng : Math.round(coords[1] * 100) / 100
						});
					});

					showMarkers();
				}

				$scope.$watch('placemarks', showMarkers);

				function showMarkers() {
					if (!map) return;
					$scope.placemarks.forEach(function (place) {
						var coords = [place.lng, place.lat];
						var mark = new ymaps.Placemark(coords, {
							hintContent: place.title,
							balloonContent: place.description
						});
						map.geoObjects.add(mark);
					});
				}
			}
		};
}]);
