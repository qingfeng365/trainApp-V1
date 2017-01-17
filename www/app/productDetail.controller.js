(function() {
  'use strict';
  var currApp = angular.module('productDetail');
  currApp
    .controller('productDetail.mainController', ['$scope', '$state', 
      '$ionicHistory',
      '$window','$stateParams',
      'appDataService',
      'appCartService',
      '$ionicLoading',
      function($scope, $state,
        $ionicHistory, 
        $window,$stateParams,
      	appDataService,
        appCartService,
        $ionicLoading) {
      	var vm = this;
      	$scope.store = {};
      	$scope.product = {};

        var storeId = parseInt($stateParams.storeId);
        var productId = parseInt($stateParams.productId);

      	vm.getData = function(){
          $ionicLoading.show();
      		return appDataService.getStoreProductDetail(storeId, productId)
      		.then(function(data){
      			$scope.store = data.store;
      			$scope.product = data.product;
            $ionicLoading.hide();
      		})
      		.catch(function(err){
      			$ionicLoading.hide();
      		});
      	};

        vm.addToCart = function(store, product){
          return appCartService.addtoCart(store, product);
        };

      	vm.getData();
      }
    ]);
})();