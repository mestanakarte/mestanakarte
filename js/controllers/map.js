app.controller('MapController', ['$scope', '$stateParams', 'Places',
	function ($scope, $stateParams, Places) {

	Places.query().then(function (places) {
		$scope.places = places;
	});
}]);
