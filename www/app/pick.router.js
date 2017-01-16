(function() {
  'use strict';
  var currApp = angular.module('pick');
  currApp  	
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app.tab.pick', {
        url: '/pick',
        views: {
          'tab-pick': {
            templateUrl: 'app/pick.template.main.html',
            controller: 'pick.mainController',
            controllerAs: 'vm',
          }
        }
      });  
  }]);
})();