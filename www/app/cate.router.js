(function() {
  'use strict';
  var currApp = angular.module('cate');
  currApp  	
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app.tab.cate', {
        url: '/cate',

        // 注意占位符的名称为 tab-life
        views: {
          'tab-life': {
            templateUrl: 'app/cate.template.main.html',
            controller: 'cate.mainController',
            controllerAs: 'vm',
          }
        }
      });  
  }]);
})();