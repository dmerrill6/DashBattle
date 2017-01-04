controllers.controller('newDashboardComponentsController', ['$scope', '$http', function($scope, $http){
	$scope.currentSelectedDashboardComponent = 'none';
	$scope.components = [];


	$scope.createPapinotasDashboard = function(){

	}

	$scope.initComponents = function(components){
		debugger;
		$scope.components = components;
	}


}]);

