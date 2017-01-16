(function() {
  'use strict';
  var currApp = angular.module('root');
  currApp
    .controller('root.rootController', ['$rootScope', '$state', '$ionicHistory',
      '$window','appCartService',
      function($rootScope, $state, $ionicHistory,$window,
        appCartService) {
        $rootScope.goBack = function() {
          $ionicHistory.goBack();
        };

        $rootScope.gotoUrl = function(targetURL){
          $window.location.href = targetURL;
        };

        $rootScope.shoppingCart = appCartService.shoppingCart;

      }
    ]);
})();
