var dashBattle =
  angular.module('DashBattle', ['ngAnimate', 'dashBattleControllers',
  'dashBattleDirectives', 'dashBattleFilters', 'gridster', 'chart.js', 'color.picker', 'colorpicker.module'])
         .config(['$animateProvider', function($animateProvider){
           $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
         }]);
