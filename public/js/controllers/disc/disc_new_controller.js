angular.module("discApp")
    .controller("DiscNewCtrl",
        ["$scope", "Disc", "$routeParams", "$location", "$filter",
            function ($scope, Disc, $routeParams, $location, $filter) {
                var self = $scope;

                self.disc = new Disc();

                self.addDisc = function () {
                    self.disc.release_date = $filter('date')(self.disc.release_date, "MM/dd/yyyy");

                    self.disc.$save(function (value, responseHeaders, status, statusText) {
                        if (status === 200) {
                            $location.path("/inventory");
                        }
                        else {
                            console.log("Error creating disc.");
                        }
                    }, function (req) {
                        console.log("error saving obj");
                    });
                };

                self.cancelOperation = function () {
                    $location.path('/disc');
                };
            }]);