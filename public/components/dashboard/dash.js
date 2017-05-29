var app = angular.module('app.dash',['ngMaterial', 'ngMessages']);
app.controller('dashCtrl',function($scope,$http,$rootScope,$document,$state, $mdSidenav,$mdToast,$filter){
  var Data;
  var self = this;
  var d = new Date();
  var aidList = ["Marriage", "Naissance", "Graduation",  "Décès Familial", "Décès de membre"];
  var vm = this;
  vm.date =""
        vm.userData ={};

        vm.nutritionList = []
        var id = sessionStorage.id;

  $document.ready(function(){
          if(id == null){
           $rootScope.isLogin = false;
         $state.go('home');
     }
     else{

       //$scope.items = [1, 2, 3, 4, 5, 6, 7];
          $scope.selectedItem;
          $http.get('api/all/user/to/aids').then(function(Userdata){
              $scope.items = Userdata.data
               }, function(err){
                 console.log("got Error From User PRofile.." ,err)
             })

            $scope.getSelectedText = function() {
              if ($scope.selectedItem !== undefined) {
                return "You have selected: Item " + $scope.selectedItem;
              } else {
                return "Please select an item";
              }
            };

         $rootScope.isLogin = true;
         var user = {}

              $scope.selectedItem;

              $scope.myDate = new Date();
           $scope.minDate = new Date(
              $scope.myDate.getFullYear(),
              $scope.myDate.getMonth() - 2,
              $scope.myDate.getDate());
           $scope.maxDate = new Date(
              $scope.myDate.getFullYear(),
              $scope.myDate.getMonth() + 2,
              $scope.myDate.getDate());
           $scope.onlyWeekendsPredicate = function(date) {
              var day = date.getDay();
              return day === 0 || day === 6;
           }

     }
    })

    $scope.memberAid =   {
          "aides": 0.00,
          "descriptions": "",
          // "date": "2017-04-27",
          "date": "",
          "dueDate": ""
      }
      // $scope.dateStart;
      // $scope.dateEnd ;


      // console.log("memberAid.date "+ $scope.memberAid.date)
      // console.log("memberAid.dueDate "+$scope.memberAid.dueDate)
        $scope.save = function() {
        
          $http.post('/api/user/recouvrements', $scope.memberAid).then(function(data){

               }, function(err){
                 console.log("got Error From User PRofile.." ,err)
             })

          };



    $scope.getSelectedText = function() {
      if ($scope.selectedItem !== undefined) {
        return "You have selected: Item " + $scope.selectedItem;
      } else {
        return "Please select an item";
      }
    };
     $scope.buttonName= "Click Me"
    $scope.toShow = "newAids";

    $scope.toggleLeft = function() {
        $mdSidenav("left")
          .toggle();
    };

    $scope.close = function () {
      $mdSidenav('left').close();
    };

     $scope.listdata =[
      {
          "index":1,
          "name":"john",
          "email":"welcome@gmail.com"
      }

     ]

    $scope.show = function (toShow) {

      $scope.toShow = toShow;
    };

})
