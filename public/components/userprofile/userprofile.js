
'use strict'

// angular.module('app.userprofile', ['ngMaterial', 'mdDataTable','ui.bootstrap',"ngTable", "ngTableDemos"]);
angular.module('app.userprofile',['ngMaterial'])
.controller('userprofileCtrl',function($scope,$http,$rootScope,$document,$state, $mdSidenav,$mdToast,$filter){
  var Data;
  var self = this;
  var d = new Date();
        var vm = this;
        vm.userData ={};

        vm.nutritionList = []
        var id = sessionStorage.id;
   //    id = 11;
   var monthlyActivityFees = {
                  "id":0,
                "category":"monthlyActivityFees"
        }
    var monthlyfoodFees = {
                  "id":0,
                "category":"monthlyFoodFees"
        }
    var monthlytontineOne= {
                  "id":0,
                "category":"tontine100"
        }
     var   monthlytontineTwo= {
                  "id":0,
                "category":"tontine500"
        }
        $document.ready(function(){
          if(id == null){
           $rootScope.isLogin = false;
         $state.go('home');
     }
     else{
         $rootScope.isLogin = true;
         var user = {}
         user.email =  localStorage.email

         monthlyActivityFees.id = id
         monthlyfoodFees.id = id
         monthlytontineOne.id = id
         monthlytontineTwo.id = id
        //  console.log("localStorage.email")
        //  console.log(localStorage.email)
        //  console.log('user')


                         $http.post('/api/user', user).then(function(data){
                               vm.userData = data.data;
                               vm.userData.insuranceBalance = 1000-data.data.assurance
                               vm.userData.inscriptionMonth = vm.userData.inscriptionMonth +", "+vm.userData.year
                               vm.userData.monthOfMeetingReception = vm.userData.monthOfMeetingReception+" , " +d.getFullYear()
                               vm.userData.monthOfTontineReception = vm.userData.monthOfTontineReception+" , " +d.getFullYear()
                               vm.userData.monthOfTontine2Reception = vm.userData.monthOfTontine2Reception+" , " +d.getFullYear()
                       //        console.log("userData")
                       //        console.log(vm.userData)

                               $scope.myFinancesArr = vm.userData.USERFINANCEs
                               $scope.monthlyFeesArr = vm.userData.MONTHLY_FEEs
                               $scope.tontines =  vm.userData.TONTINEs
                       //        console.log("$scope.tontines : ")
                       //        console.log($scope.tontines.ADDRESS)

                              }, function(err){
                                console.log("got Error From User PRofile.." ,err)
                            })

                        $http.get('/api/all/user/reception', user).then(function(data){
                               vm.userDataMeeting = data.data;


                               $scope.agReceptions = vm.userDataMeeting

                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })

                        $http.get('/api/read/finances', user).then(function(data){
                               vm.macData = data.data;

                               console.log("macData")
                               console.log(vm.macData)

                               $scope.macData = vm.userDataMeeting
                                vm.userData.macInsurance = vm.macData[0].totalAssrance
                               console.log(" $scope.macData : ")
                               console.log( vm.macData )

                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })



                         $http.post('/api/report/category', monthlyActivityFees).then(function(frreport){

                               $scope.frreports = frreport.data


                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })

                        $http.post('/api/report/category', monthlyfoodFees).then(function(foodreport){

                               $scope.foodreports = foodreport.data


                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })

                        $http.post('/api/report/category', monthlytontineOne).then(function(tontineOnereport){

                               $scope.tontineOnereports = tontineOnereport.data


                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })

                        $http.post('/api/report/category', monthlytontineTwo).then(function(tontineTworeport){

                               $scope.tontineTworeports = tontineTworeport.data


                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })

                        var macMonthFeesUsers = {"year":d.getFullYear(),"category":"monthlyActivityFees"}

                        $http.post('/api/report/all/user/category', macMonthFeesUsers).then(function(macMonthFeesUsersreport){

                               $scope.macMonthFeesUsersreports = macMonthFeesUsersreport.data


                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })

                        var macMonthfoodFeesUsers = {"year":d.getFullYear(),"category":"monthlyFoodFees"}

                        var tontineAllOne = {"year":d.getFullYear(),"category":"tontine100"}

                        $http.post('/api/report/all/user/category', tontineAllOne).then(function(tontineAllOnereport){

                               $scope.tontineAllOnereports = tontineAllOnereport.data


                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })
                        var tontineAllTwo = {"year":d.getFullYear(),"category":"tontine100"}

                        $http.post('/api/report/all/user/category', tontineAllTwo).then(function(tontineAllTworeport){

                               $scope.tontineAllTworeports = tontineAllTworeport.data

                            }, function(err){
                            console.log("got Error From User PRofile.." ,err)
                        })






var generateData = function(){
  var arr = [];
  var letterWords = ["alpha","bravo","charlie","daniel","earl","fish","grace","henry","ian","jack","karen","mike","delta","alex","larry","bob","zelda"]
  for (var i=1;i<60;i++){
    var id = letterWords[Math.floor(Math.random()*letterWords.length)];
    arr.push({"id":id+i,"name":"name "+i,"description":"Description of item #"+i,"field3":id,"field4":"Some stuff about rec: "+i,"field5":"field"+i});
  }
  return arr;
}

var sortingOrder = 'name'; //default sort

// (function () {
//  $scope.items = null;

  $http.post('/api/report/all/user/category', macMonthfoodFeesUsers).then(function(macMonthfoodFeesUsersreport){

         $scope.macMonthfoodFeesUsersreports = macMonthfoodFeesUsersreport.data
         $scope.items = macMonthfoodFeesUsersreport.data
         $scope.tableParams = new NgTableParams({}, { dataset: macMonthfoodFeesUsersreport.data});
      }, function(err){
      console.log("got Error From User PRofile.." ,err)
  })
  $scope.sortingOrder = sortingOrder;
  $scope.pageSizes = [5,10,25,50];
  $scope.reverse = false;
  $scope.filteredItems = [];
  $scope.groupedItems = [];
  $scope.itemsPerPage = 1;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.sizes = 13
//  $scope.items = generateData();
var searchMatch = function (haystack, needle) {
  if (!needle) {
    return true;
  }
  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

// init the filtered items
$scope.search = function () {
  $scope.filteredItems = $filter('filter')($scope.items, function (item) {
    for(var attr in item) {
      if (searchMatch(item[attr], $scope.query))
        return true;
    }
    return false;
  });
  // take care of the sorting order
  if ($scope.sortingOrder !== '') {
    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
  }
  $scope.currentPage = 0;
  // now group by pages
  $scope.groupToPages();
};

// show items per page
$scope.perPage = function () {
  $scope.groupToPages();
};
console.log("I AM HERRE THE LENGTH IS $scope.filteredItems.length ")
// calculate page in place
$scope.groupToPages = function () {
  $scope.pagedItems = [];

  for (var i = 0; i < $scope.filteredItems.length; i++) {
    if (i % $scope.itemsPerPage === 0) {
      $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
    } else {
      $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
    }
  }
};

 $scope.deleteItem = function (idx) {
      var itemToDelete = $scope.pagedItems[$scope.currentPage][idx];
      var idxInItems = $scope.items.indexOf(itemToDelete);
      $scope.items.splice(idxInItems,1);
      $scope.search();

      return false;
  };

$scope.range = function (start, end) {
  var ret = [];
  if (!end) {
    end = start;
    start = 0;
  }
  for (var i = start; i < end; i++) {
    ret.push(i);
  }
  return ret;
};

$scope.prevPage = function () {
  if ($scope.currentPage > 0) {
    $scope.currentPage--;
  }
};

$scope.nextPage = function () {
  if ($scope.currentPage < $scope.pagedItems.length - 1) {
    $scope.currentPage++;
  }
};

$scope.setPage = function () {
  $scope.currentPage = this.n;
};

// functions have been describe process the data for display
$scope.search();


// change sorting order
$scope.sort_by = function(newSortingOrder) {
  if ($scope.sortingOrder == newSortingOrder)
    $scope.reverse = !$scope.reverse;

  $scope.sortingOrder = newSortingOrder;
};
// })();







































     }

    })



     $scope.buttonName= "Click Me"

//    $scope.showMyResult = function(){

//       $http.post('/showResult',{userID:id}).then(function(data){
//           console.log("Showing result ", data.data);
//           if(data.data == null || data.data == ""){
//               $scope.userResult = "There is no Result to shown.."
//               $scope.noResult = true;
//           }
//           else{
//               $scope.noResult = false;
//           $scope.results= data.data;
//           console.log("Results " ,$scope.results);
//           $scope.lastResult = true;

//           } },
//       function(err){
//           console.log('Got Error due to ' ,err);
//       })

//     }


    $scope.toShow = "userprofile";
    //$scope.toShow =  $state.go('profile');
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

//     $scope.openLeftMenu = function() {
//     $mdSidenav('left').toggle();
//   };




})
