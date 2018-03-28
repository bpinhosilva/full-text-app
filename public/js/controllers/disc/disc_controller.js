angular.module("discApp")
    .controller("DiscCtrl", ["$scope", "$rootScope", "Disc", "$location", "$route",
        function ($scope, $rootScope, Disc, $location, $route) {
            var self = $scope;

            self.discs = Disc.query({}, function () {
                self.discs.forEach(function (value, index) {
                    value.release_date = new Date(value.release_date);
                });
            });

            self.goToCreateView = function () {
                $location.path("/disc/new");
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