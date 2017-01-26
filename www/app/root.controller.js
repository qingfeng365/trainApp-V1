(function() {
  'use strict';
  var currApp = angular.module('root');
  currApp
    .controller('root.rootController', ['$rootScope', '$state', '$ionicHistory',
      '$window', 'appCartService', '$ionicModal', 'appAuthService',
      '$ionicPopup',
      function($rootScope, $state, $ionicHistory, $window,
        appCartService, $ionicModal, appAuthService,
        $ionicPopup) {
        $rootScope.goBack = function() {
          $ionicHistory.goBack();
        };

        $rootScope.gotoUrl = function(targetURL) {
          $window.location.href = targetURL;
        };

        $rootScope.shoppingCart = appCartService.shoppingCart;

        // 创建公用的登录模态视图

        var loginModal = null;

        // 为登录模态视图创建独立的Scope,如果是普通的模态窗口,
        // 不需要这样处理,直接使用调用者自身的$scope一般就可以了
        // 这里是因为有很多地方调用,避免混乱,因为ionic的模态窗口,
        // 不能指定controller,只能指定scope
        var loginModalScope = $rootScope.$new();
        loginModalScope.input = {
          userName:'',
          password:'',
        };
        // 初始化登录模态视图所使用的方法和变量
        // 
        // 登录模态视图的关闭按钮的方法
        loginModalScope.close = function() {
          loginModal.hide();
        };

        loginModalScope.login = function() {
          // 判断登录是否成功,此处省略
          var isOk = (loginModalScope.input.userName !== '');

          // 登录成功就跳转,不成功就禁止状态转换
          if (isOk) {
            // 此处有一系列登录成功后的初始化工作,
            // 如处理登录用户对象,购物车对象,用户中心等等

            // 如果登录成功,就初始化
            appAuthService.loginUser.islogined = true;
            appAuthService.loginUser.userId = 1;
            appAuthService.loginUser.userName = 'user1';

            loginModal.hide();
            console.log('准备跳转:');
            console.log(loginModalScope.next);

            if(loginModalScope.next.toState){
              $state.go(loginModalScope.next.toState.name,
                loginModalScope.next.toParams || {});
            } else {
              var nextURL = loginModalScope.next.nextURL || '#/';
              $window.location.href = nextURL;
            }

          } else {
            //如果不成功,应提示错误信息
            console.log('登录信息不正确!!!!');

            // title template okText 都可以使用html片断
            // 以显示特殊效果
            $ionicPopup.alert({
              title:'提示',
              template:'请输入用户名和密码...',
              okText:'确定',
              okType:'button-assertive'
            })
            .then(function(result){
              console.log(result);
            });



          }
        };


        // 创建模态视图对象
        // 注意:
        // 模态视图对象中实际scope,是利用传进去的scope创建的子scope,
        // 即实际scope的父级scope才是loginModalScope,
        // 因此用于编辑框的ng-model必须是对象的属性,如 input.xxxx
        // 不可以直接使用普通变量
        $ionicModal.fromTemplateUrl('app/loginModal.html', {
          scope: loginModalScope
        }).then(function(loginModalobj) {
          console.log('loginModal create.....');
          loginModal = loginModalobj;
        });

        // 清除模态视图对象
        $rootScope.$on('$destroy', function() {
          loginModal.remove();
        });

        // 调用弹窗的方法
        /**
         * [openLoginModal 打开登录视图]
         * @param  {object} next [登录成功后要跳转的配置对象]
         * @return {[type]}         [description]
         *
         * next格式:
         *
         * {
         *   toState: {}, 
         *   toParams: {},
         *   nextUrl: '',
         * }
         * 
         */
        $rootScope.openLoginModal = function(next) {
          loginModalScope.next = next;
          loginModal.show();
        };

        // 拦截状态变更开始事件
        // https://ui-router.github.io/ng1/docs/0.3.1/index.html#/api/ui.router.state.$state
        // 相关事件: $stateChangeError $stateChangeStart $stateChangeSuccess $stateNotFound
        // 
        // 
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          console.log('toState:');
          console.log(toState);
          console.log('toParams:');
          console.log(toParams);
          console.log('fromState:');
          console.log(fromState);
          console.log('fromParams:');
          console.log(fromParams);

          // 判断是否为需要登录的事件
          // 此处应用独立的服务处理哪个状态应该需要登录

          // 判断过程
          // - 状态是否需要登录
          // -- 如果需要登录
          // --- 目前是否已经登录
          // ----- 如果已经登录,不做处理
          // ----- 如果没有登录,禁止事件处理,弹出登录视图
          // -- 如果不需要登录,不做处理

          if(toState.name === 'app.productDetail'){
            // 该状态需要登录

            if(!(appAuthService.loginUser && appAuthService.loginUser.islogined)){
              // 当前没有登录

              //未登录，阻止页面跳转。
              event.preventDefault();

              $rootScope.openLoginModal({
                toState:toState,
                toParams:toParams,
              });
            }
          }
        });
      }
    ]);
})();