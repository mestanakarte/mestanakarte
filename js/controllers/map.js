app.controller('MapController', ['$scope', '$stateParams', 'Places',
	function ($scope, $stateParams, Places) {
		ymaps.ready(function () {
			this.removeGeoObject = function (obj) {
				$scope.map.geoObjects.remove(obj);
			};
			this.addGeoObject = function (obj) {
				$scope.map.geoObjects.add(obj);
			};
			this.getMap = function () {
				return $scope.map;
			};
		}.bind(this));

		Places.query().then(function (places) {
			$scope.places = places;
		});
	}
]);
