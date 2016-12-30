var dashBattle =
  angular.module('DashBattle', ['ngAnimate', 'dashBattleControllers',
  'dashBattleDirectives', 'dashBattleFilters', 'gridster'])
         .config(['$animateProvider', function($animateProvider){
           $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

         }]);
