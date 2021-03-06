(function() {
  angular.module('starter', ['ionic', 'starter.controllers']).run([
    function($ionicPlatform) {
      return $ionicPlatform.ready(function() {
        if (window.cordove && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          return StatusBar.styleDefault;
        }
      });
    }
  ]).config([
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      }).state('app.search', {
        url: "/search",
        views: {
          'menuContent': {
            templateUrl: "templates/search.html"
          }
        }
      }).state('app.browse', {
        url: "/browse",
        views: {
          'menuContent': {
            templateUrl: "templates/browse.html"
          }
        }
      }).state('app.playlists', {
        url: "/playlists",
        views: {
          'menuContent': {
            templateUrl: "templates/playlists.html",
            controller: 'PlaylistsCtrl'
          }
        }
      }).state('app.single', {
        url: "/playlists/:playlistId",
        views: {
          'menuContent': {
            templateUrl: "templates/playlist.html",
            controller: 'PlaylistCtrl'
          }
        }
      });
      $urlRouterProvider.otherwise('/app/playlists');
    }
  ]);

}).call(this);
