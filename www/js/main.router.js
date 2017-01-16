(function(){
	'use strict';

	var currApp = angular.module('main');

	/**
	 * 定义顶级缺省路由
	 */
	currApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

	}]);


})();
