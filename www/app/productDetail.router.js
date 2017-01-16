(function() {
  'use strict';
  var currApp = angular.module('productDetail');
  currApp  	
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app.productDetail', {
        url: '/productDetail/:storeId/:productId',
        views: {
          '': {
            templateUrl: 'app/productDetail.template.main.html',
            controller: 'productDetail.mainController',
            controllerAs: 'vm',
          }
        }
      });  
  }]);
})();