(function() {
  'use strict';
  var currApp = angular.module('near');
  currApp  	
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app.tab.near', {
        url: '/near',
        views: {
          'tab-near': {
            templateUrl: 'app/near.template.main.html',
            controller: 'near.mainController',
            controllerAs: 'vm',
          }
        }
      });  
  }]);
})();