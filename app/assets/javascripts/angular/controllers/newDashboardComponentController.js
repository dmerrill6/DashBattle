controllers.controller('newDashboardComponentsController', ['$scope', '$http', function($scope, $http){
	$scope.currentSelectedDashboardComponent = 'none';
	$scope.components = {};


	$scope.createPapinotasDashboard = function(path, idDashboard, apiKey, title, subtitle){
		var refresh_time = 10;
		if($scope.currentSelectedDashboardComponent == 'users'){
			var endpoint = 'http://api.papinotas.com/papinotas/api/v2.0/get_quantity_users?token=';
			var response_data_location = 'data[0].cantidad';
			var component_type = 'amount';
		}else if($scope.currentSelectedDashboardComponent == 'messages'){
			var endpoint = 'http://api.papinotas.com/papinotas/api/v2.0/get_quantity_sms_message?token=';
			var response_data_location = 'data[0].cantidad';
			var component_type = 'amount';
		}else if($scope.currentSelectedDashboardComponent == 'ranking'){
			var endpoint = 'http://api.papinotas.com/papinotas/api/v2.0/sms_top_10_institution?token=';
			var response_data_location = 'data[0].top_10';
			var component_type = 'bar-chart';
			refresh_time = 100;
		}else if($scope.currentSelectedDashboardComponent == 'altera_status'){
			var endpoint = "https://altera-robot.herokuapp.com/sms/api/v1.0/altera/status?token=";
			var response_data_location = "";
			var component_type = "status-with-success-rate";
			refresh_time = 10;
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
					'refresh_time' : refresh_time,
					'component_id' : $scope.components[component_type].id, 
					'col' : 1,
					'row' : 1,
					'sizeX':null,
					'sizeY':null,
					'dashboard_id' : idDashboard
				}
			}
		}).then(function successCallback(response) {
					alert("Component created successfully");
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
