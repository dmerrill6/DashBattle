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
    isMobile: false, // stacks the grid items if true
    mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
    mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
    minColumns: 1, // the minimum columns the grid must have
    minRows: 2, // the minimum height of the grid, in rows
    maxRows: 100,
    defaultSizeX: 2, // the default width of a gridster item, if not specifed
    defaultSizeY: 1, // the default height of a gridster item, if not specified
    minSizeX: 1, // minimum column width of an item
    maxSizeX: null, // maximum column width of an item
    minSizeY: 1, // minumum row height of an item
    maxSizeY: null, // maximum row height of an item
    resizable: {
       enabled: false
    },
    draggable: {
       enabled: true // whether dragging items is supported
    }
};
}]);
