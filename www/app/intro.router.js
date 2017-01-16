(function() {
  'use strict';
  var currApp = angular.module('intro');
  currApp
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('intro', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/intro.template.main.html',
            controller: 'intro.mainController',
            controllerAs: 'vm',
          }
        }
      });
    }]);
})();
