
var app = angular.module('MyApp',['ngMaterial']);

app.controller('AppCtrl', function($scope) {

  var MESSAGE_SCHEMA = {
    "type": 'object',
    "properties": {
      "text": {
        "type": "string"
      }
    }
  };

  $scope.payload = function(data){
    $scope.displayText = data.payload.text;
    $scope.$apply()
  }

  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++)
  {
    if (query[i] === "")
    continue;
    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  var conn = meshblu.createConnection({
    "uuid": GET.uuid,
    "token": GET.token
  });

  conn.on('ready', function(data){
    console.log('UUID AUTHENTICATED!');
    console.log(data);
    conn.update({
      "uuid": GET.uuid,
      "messageSchema": MESSAGE_SCHEMA
    });

    conn.on('message', function(data){
      $scope.payload(data);
    });

  });

});
