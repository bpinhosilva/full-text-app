var app = angular.module("discApp", [
    "ngRoute",
    "ngResource",
    "ngStorage"
]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/", {
            redirectTo: "/disc"
        })
        .when("/disc", {
            templateUrl: "views/disc/disc_view.html",
            controller: "DiscCtrl",
            controllerAs: "discCtrl"
        })
        .when("/disc/new", {
            templateUrl: "views/disc/disc_new_view.html",
            controller: "DiscNewCtrl",
            controllerAs: "discNewCtrl"
        })
        .when("/disc/search", {
            templateUrl: "views/disc/disc_search_view.html",
            controller: "DiscSearchCtrl",
            controllerAs: "discSearchCtrl"
        })
        .when("/disc/:id/edit", {
            templateUrl: "views/disc/disc_edit_view.html",
            controller: "DiscEditCtrl",
            controllerAs: "discEditCtrl"
        })
        .otherwise({
            redirectTo: "/disc"
        });
});
