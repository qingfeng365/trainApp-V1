(function() {
  'use strict';
  var currApp = angular.module('user');
  currApp  	
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app.tab.user', {
        url: '/user',
        views: {
          'tab-user': {
            templateUrl: 'app/user.template.main.html',
            controller: 'user.mainController',
            controllerAs: 'vm',
          }
        }
      });  
  }]);
})();