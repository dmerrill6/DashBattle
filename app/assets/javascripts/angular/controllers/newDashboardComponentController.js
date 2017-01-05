controllers.controller('newDashboardComponentsController', ['$scope', '$http', function($scope, $http){
	$scope.currentSelectedDashboardComponent = 'none';
	$scope.components = {};


	$scope.createPapinotasDashboard = function(path, idDashboard, apiKey, title, subtitle){
		if($scope.currentSelectedDashboardComponent == 'users'){
			var endpoint = 'http://papinotas-goten.us-west-2.elasticbeanstalk.com/papinotas/api/v2.0/get_quantity_users?token='
			var response_data_location = 'data[0].cantidad';
		}else if($scope.currentSelectedDashboardComponent == 'messages'){
			var endpoint = 'http://papinotas-goten.us-west-2.elasticbeanstalk.com/papinotas/api/v2.0/get_quantity_sms_message?token='
			var response_data_location = 'data[0].cantidad';
		}

		$http({
			method: 'POST',
			url: path,
			data: {
				component_dashboard: {
					'title' : title,
					'subtitle' : subtitle,
					'endpoint' : endpoint+apiKey,
					'response_data_location' : response_data_location,
					'refresh_time' : 10,
					'component_id' : $scope.components['amount'].id,
					'col' : 1,
					'row' : 1,
					'dashboard_id' : idDashboard					
				}
			}
		}).then(function successCallback(response) {
			debugger;
		}, function errorCallback(response) {
        	alert("I'm wrong father");
      	});
	}

	$scope.initComponents = function(components){
		components.forEach(function(element){
			$scope.components[element.data_type] = element;
		});
	}


}]);

