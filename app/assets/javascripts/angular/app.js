var dashBattle =
  angular.module('DashBattle', ['ngAnimate', 'dashBattleControllers',
  'dashBattleDirectives', 'dashBattleFilters', 'gridster', 'chart.js'])
         .config(['$animateProvider', function($animateProvider){
           $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

         }]);
