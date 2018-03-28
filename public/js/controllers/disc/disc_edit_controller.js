angular.module("discApp")
    .controller("DiscEditCtrl",
        ["$scope", "Disc", "$routeParams", "$location", "$filter",
            function ($scope, Disc, $routeParams, $location, $filter) {
                var self = $scope;

                self.disc = Disc.get({id: $routeParams.id}, function () {
                    self.disc.release_date = new Date(self.disc.release_date);
                });

                self.updateDisc = function () {
                    self.disc.release_date = $filter('date')(self.disc.release_date, "MM/dd/yyyy");

                    self.disc.$update()
                        .then(function (res) {
                            $location.path("/disc");
                        })
                        .catch(function (req) {
                            console.log("error updating obj");
                            console.log(req);
                        });
                };

                self.cancelOperation = function () {
                    $location.path('/disc');
                };
            }]);