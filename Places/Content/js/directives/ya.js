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
							zoom: 11,
							behaviors: ['default', 'scrollZoom']
						});
						scope.map.controls
							.add('zoomControl')
							.add('typeSelector');
						scope.map.events.add('click', function(event){
							var coords = event.get('coordPosition');
							$rootScope.$broadcast('map:pointSelected', {
								lng : Math.round(coords[0] * 1e6) / 1e6,
								lat : Math.round(coords[1] * 1e6) / 1e6
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
				};
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
				var options = {};
				if (place.editing) {
					options.preset = 'twirl#redIcon';
				}
				var mark = new ymaps.Placemark(coords, {
					hintContent: place.title,
					balloonContent: place.description
				}, options);
				mark.place = place;
				var isEditing = false;
				var savedCoordsBeforeEdit = {};
				$rootScope.$on('place:edit', function (_, place) {
					if (place.id === scope.place.id) {
						savedCoordsBeforeEdit.lat = place.lat;
						savedCoordsBeforeEdit.lng = place.lng;
						isEditing = true;
						mark.options.set('preset', 'twirl#redIcon');
					}
				});
				$rootScope.$on('place:cancelEdit', function (_, place) {
					if (place.id === scope.place.id) {
						isEditing = false;
						mark.options.unset('preset');
						mark.geometry.setCoordinates([savedCoordsBeforeEdit.lng, savedCoordsBeforeEdit.lat]);
						savedCoordsBeforeEdit = {};
					}
				});
				$rootScope.$on('place:save', function (_, place) {
					if (place.id === scope.place.id) {
						isEditing = false;
						mark.options.unset('preset');
					}
				});
				$rootScope.$on('map:pointSelected', function(_, place) {
					if (isEditing) {
						mark.geometry.setCoordinates([place.lng, place.lat]);
					}
				});
				scope.$watch('place', function (place) {
					mark.geometry.setCoordinates([place.lng, place.lat]);
				}, angular.equals);
				scope.$on('$destroy', function () {
					yMap.removeGeoObject(mark);
				});
				yMap.addGeoObject(mark);
			}
		};
}]);
