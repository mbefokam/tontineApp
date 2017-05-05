(function () {
    angular
        .module("matApp", [
            "ngRoute",
            "ngMaterial",
            "ngMessages",
        //    "tontine.users",
            "matApp.mod"
        ])
        .config(["$routeProvider", "$mdThemingProvider", config])
        .controller("IndexCtrl", ["$location", IndexCtrl]);

    function config($routeProvider, $mdThemingProvider) {

        // This route gives you the default location to where your app will return to if it cannot find a url
        $routeProvider.otherwise({
            redirectTo: "/"
        })

        // $mdThemingProvider gives control over color palette of elements
        $mdThemingProvider.theme("default")
            .primaryPalette('blue');
        // .accentPalette();

    }

    function IndexCtrl($location) {
        var vm = this;

        vm.home = function () {
            $location.path('/');
        }
    }

})();