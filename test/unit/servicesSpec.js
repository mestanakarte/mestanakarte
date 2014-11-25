describe('Mesta services', function () {

	beforeEach(module('mestaApp'));

	describe('Places service', function () {
		var Places, $httpBackend;

		var place1 = {
			id: 1,
			title: 'Greenwich',
			description: 'Greenwich Description',
			lat: 51.476842,
			lng: 0,
			user_id: 1
		};
		var place2 = {
			id: 2,
			title: "Грушеука",
			description: "метро",
			lng: 53.8867,
			lat: 27.5148,
			user_id: 2
		};
		var newPlace = {
			title: "Грушеука",
			description: "метро",
			lng: 53.8867,
			lat: 27.5148,
			user_id: 2
		};

		function clone(obj) {
			return JSON.parse(JSON.stringify(obj));
		}

		beforeEach(inject(function (_Places_, _$httpBackend_) {
			Places = _Places_;
			$httpBackend = _$httpBackend_;
		}));

		describe('#query', function () {
			it('should request all places', function (done) {
				$httpBackend
					.expectGET('/places')
					.respond(200, clone([place1, place2]));

				Places.query().then(function (data) {
					expect(data.length).toBe(2);
					done();
				});
				$httpBackend.flush();
			});
		});

		describe('#get', function () {
			it('should return resolved promise on success', function (done) {
				$httpBackend
					.expectGET('/places/1')
					.respond(200, clone(place1));

				Places.get({ id: 1 }).then(function (data) {
					expect(data.id).toBe(1);
					done();
				});

				$httpBackend.flush();
			});
			it('should return rejected poromise on error', function (done) {
				$httpBackend
					.expectGET('/places/404')
					.respond(404);

				Places.get({ id: 404 }).catch(function (err) {
					// TODO: define error object format
					expect(err.status).toBe(404);
					done();
				});

				$httpBackend.flush();
			});
		});

		describe('#save', function () {
			it('should post to /places if model is new and return id', function (done) {
				var savedNewPlace = clone(newPlace);
				savedNewPlace.id = 101;
				$httpBackend
					.expectPOST('/places', newPlace)
					.respond(200, savedNewPlace);

				Places.save(newPlace).then(function (savedPlace) {
					expect(savedPlace.id).toBe(101);
					// Should not affect original object (?)
					expect(newPlace.id).toBeUndefined();
					done();
				});

				$httpBackend.flush();
			});

			it('should use id in url for existing places', function (done) {
				$httpBackend
					.expectPOST('/places/1', place1)
					.respond(200, place1);

				Places.save(place1).then(function (data) {
					expect(data.id).toBe(place1.id);
					done();
				});

				$httpBackend.flush();
			});
		});

		describe('#delete', function () {
			it('should send DELETE request to /places/:id', function (done) {
				$httpBackend
					.expectDELETE('/places/2')
					.respond(200);

				Places.delete({ id: place2.id }).then(function () {
					done();
				});

				$httpBackend.flush();
			});
		});
	});

});

