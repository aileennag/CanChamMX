// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
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
  .state('app.calendario', {
      url: '/calendario',
      views: {
        'menuContent': {
          templateUrl: 'templates/calendario.html',
          controller: 'MainCtrl'
        }
      }
  })
  .state('app.afiliate', {
    url: '/afiliate',
    views: {
      'menuContent': {
        templateUrl: 'templates/afiliate.html'
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
          controller: 'PlaylistCtrl'
          }
      }
  })
        .state('app.repositorio', {
               url: '/repositorio',
               views: {
               'menuContent': {
               templateUrl: 'templates/repositorio.html'
               //controller: 'HomeCtrl'
               }
               }
               })
        
        .state('app.docs', {
               url: '/docs',
               views: {
               'menuContent': {
               templateUrl: 'templates/docs.html'
               //controller: 'AppCtrl'
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
