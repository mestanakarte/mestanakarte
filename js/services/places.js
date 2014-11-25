app.provider('Places', function PlacesProvider() {
    var pattern = '/places/:id';

    this.setUrlPattern = function setUrlPattern(newPattern) {
        pattern = newPattern;
    };

    this.$get = ['$resource', function($resource) {
        var res = $resource(pattern, { id: '@id' });
        return {
            query: function (params) {
                return res.query(params).$promise;
            },
            get: function (params) {
                return res.get(params).$promise;
            },
            save: function (params) {
                return res.save(params).$promise;
            },
            delete: function (params) {
                return res.delete(params).$promise;
            }
        };
    }];
});
