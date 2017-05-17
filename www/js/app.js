// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $state, $ionicPopup) {
  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="app.home"){
      $ionicPopup.confirm({
        title: 'CanChamApp',
        template: '¿Quieres salir de la aplicación?'
      }).then(function(res) {
        if (res) {
          navigator.app.exitApp();
        }
      })
    }else {
      navigator.app.preventDefault();
    }
  }, 100);
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'HomeCtrl'
  })

  .state('app.home', {
    url: '/inicio',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html'
      }
    }
  })

  .state('app.homelg', {
    url: '/inicio-logout',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio_logout.html'
      }
    }
  })
  .state('menuCodigo', {
    url: '/menuCodigo',
    views: {
      'menuCodigo': {
          //controller: 'ui/modules/settings/ctrl.js',
          templateUrl: 'templates/menuCodigo.html'
      }
    }
  })
  .state('app.calendario', {
      url: '/calendario',
      views: {
        'menuContent': {
          templateUrl: 'templates/calendario.html',
          controller: 'EventosCtrl'
        }
      }
  })
  .state('app.afiliate', {
    url: '/afiliate',
    views: {
      'menuContent': {
        templateUrl: 'templates/afiliate.html',
        controller: 'AfiliateCtrl'
      }
    }
  })
  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LogCtrl'
        }
      }
  })
  .state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
         templateUrl: 'templates/logout.html',
          //controller: 'LogCtrl'
        }
      }
  })
  .state('app.preguntas', {
      url: '/preguntas',
      views: {
         'menuContent': {
          templateUrl: 'templates/preguntas.html',
          controller: 'PreguntasCtrl'
          }
      }
  })
  .state('app.repositorio', {
      url: '/repositorio',
      views: {
        'menuContent': {
         templateUrl: 'templates/repositorio.html',
         controller: 'RepositorioCtrl'
         }
      }
  })
  .state('app.acercade', {
      url: '/acercade',
      views: {
         'menuContent': {
          templateUrl: 'templates/acercade.html',
          //controller: 'PreguntasCtrl'
          }
      }
  })
  .state('app.evento', {
      url: '/evento',
      views: {
         'menuContent': {
          templateUrl: 'templates/evento.html',
          controller: 'EventoCtrl'
          }
      }
  })
  .state('app.loginmail', {
      url: '/login-mail',
      views: {
        'menuContent': {
          templateUrl: 'templates/loginMail.html',
          controller: 'LogCtrl'
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/inicio');
});
