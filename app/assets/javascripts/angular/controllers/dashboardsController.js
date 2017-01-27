controllers.controller('DashboardsController', ['$scope', '$http',function($scope, $http){
  $scope.dashboardId;

 $scope.$on('colorpicker-closed', function(event, data) {
      var color = data.value;
        $http({
           method: 'patch',
           url: '/dashboards/' + $scope.dashboardId + ".json",
           data: {
             dashboard: {
               dashboard_color: color
             }
           }
         }).then(function successCallback(data){
           console.log(data)
         }, function errorCallback(data){
           alert("There was an error when saving background");
         });
    });


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
      if(dashboardComponent.component.data_type == 'amount'){
        dashboardComponent.amountOld = dashboardComponent.amount;
        if(dashboardComponent.amountOld == null)
          dashboardComponent.amountOld = 0;
        dashboardComponent.amount = parseDashboardComponentResponseDataLocation(response.data, dashboardComponent.response_data_location);
      }
      else if(dashboardComponent.component.data_type == 'bar-chart'){
        dashboardComponent.data = parseBarChart(response.data.data[0].top_10);
        dashboardComponent.chart_options = {
          tooltips: {
            custom: function(tooltip){
              if(!tooltip){
                return;
              }
              else{
                if(tooltip.dataPoints){
                  var new_title = dashboardComponent.data.full_names[tooltip.dataPoints[0].index];
                  if(new_title){
                    new_title = formatSchoolName(new_title);
                    tooltip.title = [new_title];
                    tooltip.titleFontSize = 10;
                    tooltip.width = new_title.length * 6;
                    tooltip.caretSize = 0;
                  }
                }
              }
            }
          },
          title: {
            display: true,
            text: dashboardComponent.title + " - " + dashboardComponent.subtitle
          }
        };
      }
      else if(dashboardComponent.component.data_type == 'status-with-success-rate'){
        dashboardComponent.success_rate = (response.data.result.success_rate*100)+ "%";
        dashboardComponent.altera_status = response.data.result.altera_status;
      }
      // Complete with other types
      dashboardComponent.loaded = true;

    }, function errorCallback(response) {
      console.log("error");
    });

  }

  var formatSchoolName = function(name){

    name = name.trim();
    if(name.includes("-")){
      name = name.split("-")[1];
    }
    name = name.trim();
    name = name.toLowerCase();
    names = name.split(' ');
    complete_name = "";
    names.forEach((name) => {
      this.complete_name =  complete_name + " " + name.charAt(0).toUpperCase() + name.slice(1);

    });
    return complete_name.trim()

  }

  var addDashboardComponent = function(dashboardComponent){
    if(dashboardComponent.sizeX == null)
      dashboardComponent.sizeX = dashboardComponent.component.width;
    if(dashboardComponent.sizeY == null)
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

  var parseBarChart = function(data) {
    var data_arr = {
      labels: [],
      values: [],
      full_names: []
    }

    for(var i =0, n=data.length; i < n; ++i)
    {
        data_arr.labels.push(data[i][0]);
        data_arr.full_names.push(data[i][1]);
        data_arr.values.push(data[i][2]);
    }
    return data_arr;
  }

  $scope.resized = function(event, $element, item) {
      // sizes[0] = width
      // sizes[1] = height
      // gridster.
      $http({
         method: 'patch',
         url: '/dashboards/' + $scope.dashboardId  + "/component_dashboards/" + item.id +  ".json",
         data: {
           component_dashboard: {
             sizeX: item.sizeX,
             sizeY: item.sizeY
           }
         }
       }).then(function successCallback(data){
       }, function errorCallback(data){
         alert("There was an error when saving size");
       });
  };

  $scope.moved = function(event, $element, item) {
      // sizes[0] = width
      // sizes[1] = height
      // gridster.
      $http({
         method: 'patch',
         url: '/dashboards/' + $scope.dashboardId  + "/component_dashboards/" + item.id +  ".json",
         data: {
           component_dashboard: {
             col: item.col,
             row: item.row
           }
         }
       }).then(function successCallback(data){
       }, function errorCallback(data){
         alert("There was an error when saving pos");
       });
  };


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
       enabled: true,
       stop: $scope.resized
    },
    draggable: {
      enabled: true, // whether dragging items is supported
      stop: $scope.moved
    }
  };
}]);
