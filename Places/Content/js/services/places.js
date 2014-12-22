app.provider('Places', function PlacesProvider() {
    var pattern = '/GeoTag/:id';

    this.setUrlPattern = function setUrlPattern(newPattern) {
        pattern = newPattern;
    };

    function serialize (clientModel) {
        return {
            Id: clientModel.id,
            Name: clientModel.title,
            Description: clientModel.Description,
            Point: {
                Lat: clientModel.lat,
                Long: clientModel.lng
            }
        };
    }

    function deserialize(serverModel) {
        return {
            id: serverModel.Id,
            title: serverModel.Name,
            description: serverModel.Description,
            lat: serverModel.Point.Lat,
            lng: serverModel.Point.Long
        };
    }

    this.$get = ['$resource', 'apiRoot', function($resource, apiRoot) {
        var url = apiRoot + pattern;
        var res = $resource(url, { id: '@id' });
        return {
            query: function (params) {
                return res.query(params).$promise.then(function (models) {
                    return model.map(deserialize);
                });
            },
            get: function (params) {
                return res.get(params).$promise.then(deserialize);
            },
            save: function (params) {
                return res.save(serialize(params)).$promise;
            },
            delete: function (params) {
                return res.delete(serialize(params)).$promise;
            }
        };
    }];
});
