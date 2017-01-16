(function() {
  'use strict';
  var currApp = angular.module('intro');
  currApp
    .controller('intro.mainController', ['$scope', '$state', '$ionicHistory',
      '$window',
      function($scope, $state, $ionicHistory, $window) {
        var vm = this;

        //ion-slides 是利用swiper插件,因此部分设置还需要看swiper api
        //http://idangero.us/swiper/api/#.WGnhtJKdrCg
        vm.options = {
          loop: false,
          effect: 'fade',
          speed: 500,
        };

        vm.gotoHome = function(){
          $state.go('app.tab.life', {});
          $window.localStorage['intromain_isshowed'] = 'true';
        };

        
        console.log('localStorage["intromain_isshowed"]:' + $window.localStorage['intromain_isshowed']);

        /**
         * 如果想每次打开均见到引导页,则取消下面的注释
         */
        // $window.localStorage['intromain_isshowed'] = 'false';

        // $window.localStorage 只能存储字符串
        if ($window.localStorage['intromain_isshowed'] === 'true'){
          // 表示引导页已被执行过,直接跳转
          vm.gotoHome();
        }else{
          //如果没有被执行过,则等用户手动跳转          
        }

      }
    ]);

})();
