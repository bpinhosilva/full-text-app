angular.module("discApp")
    .controller("DiscSearchCtrl", ["$scope", "$rootScope", "Disc", "$location", "$route",
        function ($scope, $rootScope, Disc, $location, $route) {
            var self = $scope;

            self.discs = [];

            self.searchDisc = function() {
                self.discs = [];

                var items = Disc.search({term: self.term}, function () {
                    items.hits.hits.forEach(function (value, index) {
                        var element = value._source;

                        element.release_date = new Date(element.release_date);

                        self.discs.push(element);
                    });

                    console.log(self.discs);
                });
            };

            self.goToMainView = function () {
                $location.path("/disc");
            };

            self.deleteDisc = function (index) {
                Disc.delete({id: self.discs[index].id}, function (value, responseHeaders, status, statusText) {
                    if (status === 200) {
                        $route.reload();
                    }
                    else {
                        console.log("Error creating disc.");
                    }
                }, function (req) {
                    console.log("error saving obj");
                });
            };
        }]);