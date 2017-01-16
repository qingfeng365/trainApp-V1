(function() {
  'use strict';
  var currApp = angular.module('mall');
  currApp   
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app.tab.mall', {
        url: '/mall',

        // 注意占位符的名称为 tab-near
        views: {
          'tab-near': {
            templateUrl: 'app/mall.template.main.html',
            controller: 'mall.mainController',
            controllerAs: 'vm',
          }
        }
      });  
  }]);
})();