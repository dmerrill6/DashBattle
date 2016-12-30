controllers.controller('DashboardsController', ['$scope', '$http', function($scope, $http){
  $scope.dashboardComponents = [];
  $scope.fetchDashboardComponents = function(dashboardComponentsPath){
    // $http({
    //   url: dashboardComponentsPath,
    //   method: "GET"
    // }).then(function successCallback(data){
    //   for(var i = 0; i < data.length; i++){
    //     addDashboardComponent(data[i]);
    //   }
    // }, function errorCallback(data){
    //   alert("There was an error while loading :(");
    // });

    for(var i = 0; i < 10; i++){
      addDashboardComponent({
        col: i,
        row: 0,
        endpoint: "test",
        sizeX: 1,
        sizeY: 1
      });
    }
  }

  var addDashboardComponent = function(dashboardComponent){
    $scope.dashboardComponents.push(dashboardComponent);
  }
}]);
