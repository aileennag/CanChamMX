angular.module('starter.controllers', [])


.controller('LogCtrl', function($scope, $state, $q, UserService, $ionicLoading, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/loginMail.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
    //$state.go('app.loginmail');
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  //This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      //for the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });

      $ionicLoading.hide();
      $state.go('app.homelg');

    }, function(fail){
      //fail get profile info
      console.log('profile info fail', fail);
    });
  };


  //This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  //this method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {

    facebookConnectPlugin.getLoginStatus(function(success){
     if(success.status === 'connected'){
        // the user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        //check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID)
        {
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {

            //for the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            //go back to app.home if its not working
            $state.go('app.homelg');

          }, function(fail){
            //fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          //go back to app.home if its not working
          $state.go('app.home');
        }

     } else {
        //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
        //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };

  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });

    window.plugins.googleplus.login(
      {},
      function (user_data) {
        // For the purpose of this example I will store user data on local storage
        UserService.setUser({
          userID: user_data.userId,
          name: user_data.displayName,
          email: user_data.email,
          picture: user_data.imageUrl,
          accessToken: user_data.accessToken,
          idToken: user_data.idToken
        });

        $ionicLoading.hide();
        $state.go('app.home');
      },
      function (msg) {
        $ionicLoading.hide();
      }
    );
  };

})

.controller('HomeCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){

  $scope.user = UserService.getUser();

  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Logging out...'
        });

        //facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('app.homelg');
        },
        function(fail){
          $ionicLoading.hide();
        });
      }
    });
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $q, UserService, $ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/docs.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.docs = function() {
    $scope.modal.show();
    //$state.go('app.loginmail');
  };

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.closeDoc = function() {
    $scope.modal.hide();
  };
})

.controller('EventoCtrl', function($scope, $window) {
  $scope.formData = {};
  $scope.sendCode = function(){
    var codigo = $scope.formData.codigo;
    console.log(codigo);
    if(codigo === "rpTH0"){
      $window.location.href = 'templates/menuCodigo.html';
    }else{
      alert("Código incorrecto");
    }
    $scope.formData = "";
  };
})

.controller('AfiliateCtrl', function($scope, $stateParams, $http) {
  $scope.formData = {};
  $scope.sendForm = async = function(){
      var data = this.formData;
      var nombre = $scope.formData.firstName;
      var apellidos = $scope.formData.lastName;
      var organizacion = $scope.formData.company;
      var email = $scope.formData.email;
      var link = "https://admin-canchammx-aileennag.c9users.io/afiliate/"+nombre+"/"+apellidos+"/"+organizacion+"/"+email;
      $http.post(link).then(function successCallback(response) {
        console.log("Error: No se envió pregunta");
      }, function errorCallback(response) {
        alert("Se envió exitosamente tu información");
        console.log("Se envió");
      });
      $scope.formData = "";
    };
})

.controller('EventosCtrl', function($scope, Events, $cordovaCalendar, $timeout, $http) {
		Events.get().then(function(events) {
			console.log("events", JSON.stringify(events));
			$scope.events = events;
		});
  
  $scope.addEvent = function(event,idx) {
		console.log("add ",event);
		Events.add(event).then(function(result) {
			console.log("done adding event, result is "+result);
			if(result === 1) {
				//update the event
				$timeout(function() {
					$scope.events[idx].status = true;
					$scope.$apply();
				});
			} else {
				//For now... maybe just tell the user it didn't work?
			}
		});
	};
  
})

.controller('RepositorioCtrl', function($scope, Documents, $timeout, $cordovaFileTransfer) {
  
    Documents.get().then(function(documents) {
			console.log("documents", JSON.stringify(documents));
			$scope.documents = documents;
		});
    
    $scope.descargar = function(doc,idx){
      console.log("add ", doc);
      console.log(doc.nombre);
      console.log(doc.liga);
      document.addEventListener('deviceready', function () {
        var url = doc.liga;
        var targetPath = "";
        var trustHosts = true;
        var options = {};
        var nombre_archivo = doc.nombre;
        
        if (device.platform === "iOS") {
          targetPath = cordova.file.documentsDirectory + nombre_archivo;
        }else if (device.platform === "Android") {
          targetPath = cordova.file.dataDirectory + nombre_archivo;
        }else {
          targetPath = cordova.file.dataDirectory + nombre_archivo;
        }
      
        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function(result) {
          // Success!
            console.log("download complete: " + result.toURL());
            var file = result.toURL();
            cordova.plugins.fileOpener2.open(
            file,
            'application/pdf',
            {
              error : function(e) {
                console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
              },
              success : function () {
                console.log('file opened successfully');
              }
          });
          }, function(err) {
          // Error
            console.log("download error source " + err.source);
            console.log("download error target " + err.target);
            console.log("download error code" + err.code);
          }, function (progress) {
            $timeout(function () {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
          });
          }, false, {
            headers: {
              "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
          }
        });
    }
  
})


.controller('PreguntasCtrl', function($scope, $stateParams, $http) {
    $scope.formData = {};
    $scope.sendQuestion = async = function(){
      var data = this.formData;
      var pregunta = $scope.formData.pregunta;
      var link = "https://admin-canchammx-aileennag.c9users.io/pregunta/"+pregunta;
      $http.get(link).then(function successCallback(response) {
        alert("Se ha enviado tu pregunta satisfactoriamente al expositor");
        //navigator.notification.alert("Se ha enviado tu pregunta satisfactoriamente al expositor", null, "CanCham", "Close");
      }, function errorCallback(response) {
        console.log("Error: No se envió pregunta");
      });
      $scope.formData.pregunta = "";
    };
});


