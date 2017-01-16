(function() {
  'use strict';
  var currApp = angular.module('life');
  currApp
    .controller('life.mainController', ['$scope', '$state', '$ionicHistory',
      '$window', 'appDataService', '$q',
      function($scope, $state, $ionicHistory, $window, appDataService, $q) {
        var vm = this;

        vm.listdata = [];
        vm.isHasMoreData = true;
        /*下次取列表的开始位置*/
        vm.currNextIndex = 0;
        /*每次读取的最大条数*/
        vm.loadSize = 3;

        vm.addToListdata = function(data) {
          if (!vm.listdata) {
            vm.listdata = [];
          }
          vm.listdata = vm.listdata.concat(data);
          vm.isHasMoreData = (data.length !== 0);
        };

        /*因要被引用,写成promise*/
        vm.readListdata = function() {
          return $q(function(resolve, reject) {
            if (vm.isHasMoreData) {
              return appDataService.getStoreList(vm.currNextIndex, vm.loadSize)
                .then(function(data) {
                  console.log(data);
                  vm.currNextIndex = vm.currNextIndex + data.length;
                  return resolve(vm.addToListdata(data));
                })
                .catch(function(err) {
                  console.error(err);
                  return reject(err);
                });
            } else {
              return resolve(null);
            }
          });
        };

        // 启用上拉加载机制后,该句要注释掉
        // vm.readListdata();

        vm.loadMoreData = function() {
          if (!vm.isHasMoreData) {
            //数据已全部加载
            console.log("数据已全部加载");
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            return vm.readListdata()
              .then(function() {
                console.log("数据加载中....");
                $scope.$broadcast('scroll.infiniteScrollComplete');
              })
              .catch(function(err) {
                // 如果有错,取消刷新状态,恢复原样
                $scope.$broadcast('scroll.infiniteScrollComplete');
              });
          }
        };

        // 下拉刷新
        vm.pullRefresh = function() {
          console.log("数据刷新中....");
          vm.listdata = [];
          vm.isHasMoreData = true;
          vm.currNextIndex = 0;
          return vm.readListdata()
            .then(function() {
              $scope.$broadcast('scroll.refreshComplete');
            })
            .catch(function(err) {
              // 如果有错,取消刷新状态,恢复原样
              $scope.$broadcast('scroll.refreshComplete');
            });
        };

      }
    ]);
})();
