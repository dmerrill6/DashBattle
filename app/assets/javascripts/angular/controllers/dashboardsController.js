controllers.controller('DashboardsController', ['$scope', '$http', function($scope, $http){
  $scope.dashboardComponents = [];
  $scope.fetchDashboardComponents = function(dashboardComponentsPath){
    $http({
      url: dashboardComponentsPath,
      method: "GET"
    }).then(function successCallback(data){
      for(var i = 0; i < data.data.length; i++){
        addDashboardComponent(data.data[i]);
      }
    }, function errorCallback(data){
      alert("There was an error while loading :(");
    });
    //
    // for(var i = 0; i < 10; i++){
    //   addDashboardComponent({
    //     col: i%6,
    //     row: 0,
    //     endpoint: "test",
    //     sizeX: 1,
    //     sizeY: 1,
    //     amount: Math.round(Math.random() * 1000000, 0),
    //     title: "Papinotas Enviados",
    //     subtitle: "Por colegio " + i,
    //     component: {
    //       data_type: 'amount'
    //     }
    //   });
    // }
    // addDashboardComponent({
    //   col:0,
    //   row:2,
    //   endpoint: "test",
    //   sizeX: 2,
    //   sizeY: 1,
    //   data: {
    //     labels: ['Colegio Papinotas', 'Hunneus', 'Rial Test School', 'Instituto Nacional', 'República de Chile', 'Liceo X'],
    //     values: [100, 90, 85, 70, 50, 28]
    //   },
    //   component: {
    //     data_type: 'bar-chart'
    //   }
    // });
  }


  refreshDashboardComponent = function(dashboardComponent){
    $http({
      method: 'GET',
      url: dashboardComponent.endpoint
    }).then(function successCallback(response) {
      if(dashboardComponent.component.data_type == 'amount')
        dashboardComponent.amount = parseDashboardComponentResponseDataLocation(response.data, dashboardComponent.response_data_location);
      else {
        // Complete with other types
      }

      dashboardComponent.loaded = true;

    }, function errorCallback(response) {
      console.log("error");
    });

  }

  var addDashboardComponent = function(dashboardComponent){
    if(dashboardComponent.component.width != null)
      dashboardComponent.sizeX = dashboardComponent.component.width;
    if(dashboardComponent.component.height != null)
      dashboardComponent.sizeY = dashboardComponent.component.height;
    dashboardComponent.loaded = false;
    $scope.dashboardComponents.push(dashboardComponent);
    refreshDashboardComponent(dashboardComponent);
    if(dashboardComponent.refresh_time != null && dashboardComponent.refresh_time != 0)
      setComponentTicker(dashboardComponent);
  }

  var setComponentTicker = function(dashboardComponent){
    setInterval(function(){
      refreshDashboardComponent(dashboardComponent);
    }, dashboardComponent.refresh_time * 1000);
  }


  var parseDashboardComponentResponseDataLocation = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
  }

  $scope.gridsterOpts = {
    columns: 6, // the width of the grid, in columns
    pushing: true, // whether to push other items out of the way on move or resize
    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
    swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
    width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
    rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
    margins: [10, 10], // the pixel distance between each widget
    outerMargin: true, // whether margins apply to outer edges of the grid
    sparse: false, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
    isMobile: true, // stacks the grid items if true
    mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
    mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
    minColumns: 1, // the minimum columns the grid must have
    minRows: 2, // the minimum height of the grid, in rows
    maxRows: 100,
    defaultSizeX: 2, // the default width of a gridster item, if not specifed
    defaultSizeY: 1, // the default height of a gridster item, if not specified
    minSizeX: 1, // minimum column width of an item
    maxSizeX: 3, // maximum column width of an item
    minSizeY: 1, // minumum row height of an item
    maxSizeY: 2, // maximum row height of an item
    resizable: {
       enabled: true
    },
    draggable: {
      enabled: true // whether dragging items is supported
    }
};
}]);
