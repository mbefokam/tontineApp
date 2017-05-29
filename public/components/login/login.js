    var app = angular.module('app.signin',[])
    app.controller('loginCtrl',function($scope,$mdToast,$http,$location,$document,$state, $rootScope,heroku){


         $scope.user2  = {}

      //var email = sessionStorage.email;

      $document.ready(function(){
         $rootScope.isLogin = false;
         //$scope.isSignup = true;
         $scope.isAdmin = false;
         $scope.loading = false;


      var id = sessionStorage.id;

      if(id == null){
         $rootScope.isLogin = false;
        // $scope.isSignup = true;
         $state.go('signin');

     }
     else{
        $rootScope.isLogin = true;
                 // $scope.isSignup = false;
         $state.go('profile');
     }



    })

     $scope.login = function(){
         if(($scope.user2.email == null) || $scope.user2.userPass == null){


          $mdToast.show(
         $mdToast.simple()
        .textContent('Please Fill all field...')
        .position("bottom right")
        .hideDelay(3000)

       );

        $rootScope.isLogin = false;

       //alert('Please Fill all field...');

          $scope.user2 = "";


          }


       else{

        $http.post('/api/user', $scope.user2).then(function(data){

        //console.log('data Recieved : ' +data.message);
        console.log("got Data", data);
        var userData = data
     //   console.log("email == " ,data);
        if(data.data.success == false){

          $mdToast.show(
         $mdToast.simple()
        .textContent('User Name or Password not found...')
        .position("bottom right")
        .hideDelay(3000)
       );
            alert("email or Password not found...");
            $scope.user2 = "";
             $rootScope.isLogin = false;
        }
        else{
          var jsonstr = JSON.stringify(data.data.id);
          console.log("JSON String is " ,jsonstr);
          var data1 = data;
          var  userID = data1.data.id;
          var adminData = data1.data.admin
       //   var userData = data1.data
          var email = data1.data.email;
          console.log("email == " ,data1.data.email);

          //email = data1.data.email;
         //console.log("email == " ,email);

        localStorage.setItem("id",userID);
        localStorage.setItem("email",email);
    //    sessionStorage.setItem('email',email);


        //console.log('User id is ', userID);

       // console.log("data is", JSON.stringify(data));

       if(adminData == "true"){
           $scope.isAdmin = true;

        sessionStorage.setItem("id", userID);
           $mdToast.show(
         $mdToast.simple()
        .textContent('Wellcome Admin..')
        .position("bottom right")
        .hideDelay(3000)
       );

           //$scope.isSignup = false;
           $rootScope.isLogin = true;
        $state.go('dashboard');
       }
        else{

        sessionStorage.setItem("id", userID);

         $location.path('/');
         $scope.isAdmin = false;



       //  $scope.isSignup = false;
         $rootScope.isLogin = true;
          $state.go('profile');
        }
        }

    },function(err){

       // alert("email or password not Found..");
        $scope.user2 = "";
        console.log("got err" ,err)
    })

    }
     }

     $rootScope.signOut = function(){
         $rootScope.isLogin = false;
         localStorage.clear();
         sessionStorage.clear();
         $state.go('home');
     }

})
