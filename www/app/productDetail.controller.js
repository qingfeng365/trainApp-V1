(function() {
  'use strict';
  var currApp = angular.module('productDetail');
  currApp
    .controller('productDetail.mainController', ['$scope', '$state', 
      '$ionicHistory',
      '$window','$stateParams',
      'appDataService',
      'appCartService',
      function($scope, $state,
        $ionicHistory, 
        $window,$stateParams,
      	appDataService,
        appCartService) {
      	var vm = this;
      	$scope.store = {};
      	$scope.product = {};

        var storeId = parseInt($stateParams.storeId);
        var productId = parseInt($stateParams.productId);

      	vm.getData = function(){
      		return appDataService.getStoreProductDetail(storeId, productId)
      		.then(function(data){
      			$scope.store = data.store;
      			$scope.product = data.product;
      		})
      		.catch(function(err){
      			
      		});
      	};

        vm.addToCart = function(store, product){
          console.log('-=-=-=-==--=-');
          return appCartService.addtoCart(store, product);

          // .then()
        };

      	vm.getData();
      }
    ]);
})();