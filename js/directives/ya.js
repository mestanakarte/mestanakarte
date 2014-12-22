app.directive('yMap', ['$rootScope', '$compile',
	function($rootScope, $compile){
		return {
			restrict: 'E',
			controller: 'MapController',
			compile: function (element) {
				var children = element.children();
				element.children().remove();
				return function (scope, element, attr) {
					element.css({
						display: 'block',
						width: attr.width + 'px',
						height: attr.height + 'px'
					});
					ymaps.ready(function () {
						scope.map = new ymaps.Map(element[0], {
							center: [53.8992,27.5580],
							zoom: 11
						});
						scope.map.events.add('click', function(event){
							var coords = event.get('coordPosition');
							$rootScope.$broadcast('map:pointSelected', {
								lat : Math.round(coords[0] * 100) / 100,
								lng : Math.round(coords[1] * 100) / 100
							});
						});
						$rootScope.$on('place:show', function (event, place) {
							var it = scope.map.geoObjects.getIterator();
							var marker;
							while ((marker = it.getNext())) {
								if (marker.place === place) {
									break;
								}
							}
							if (marker) {
								marker.balloon.open();
							}
						});
						element.append(children);
						scope.$apply(function () {
							$compile(element.children())(scope);
						});
					});
				}
			}
		};
}])
.directive('yGeoObject', ['$rootScope',
	function ($rootScope) {
		return {
			restrict: 'E',
			require: '^yMap',
			scope: {
				place: '='
			},
			link: function (scope, element, attr, yMap) {
				var place = scope.place;
				var coords = [place.lng, place.lat];
				var mark = new ymaps.Placemark(coords, {
					hintContent: place.title,
					balloonContent: place.description
				});
				mark.place = place;
				yMap.addGeoObject(mark);
			}
		}
}]);
