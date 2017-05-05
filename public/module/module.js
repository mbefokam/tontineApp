(function () {
    angular.module("matApp.mod", [
        "ngRoute"
    ])
        .config(config);

        // This file is for setting up module1 routes
    function config($routeProvider) {
        $routeProvider.when("/module", {
            templateUrl: "module/views/module.html",
            controller: "ModCtrl",
            controllerAs: "vm"
        });
    }
})();