(function() {
  'use strict';
  var currApp = angular.module('app');
  currApp  	
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app', {
        url: '',
        abstract: true,
        views: {
          '': {
            templateUrl: 'app/app.template.main.html',
          }
        }
      });  

      $stateProvider.state('app.tab', {
        url: '',
        abstract: true,
        views: {
          '': {
            templateUrl: 'app/app.template.tabs.html',
          }
        }
      });  
  }]);
})();