(function() {
  'use strict';
  var currApp = angular.module('life');
  currApp  	
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app.tab.life', {
        url: '/life',
        views: {
          'tab-life': {
            templateUrl: 'app/life.template.main.html',
            controller: 'life.mainController',
            controllerAs: 'vm',
          }
        }
      });  
  }]);
})();