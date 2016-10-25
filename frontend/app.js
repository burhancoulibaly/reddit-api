var  PageApp = angular.module('AppPage',['ngRoute']);
	PageApp.controller('AppCtrl',['$scope','$http',($scope,$http)=>{

		function getIdentity(token){
			console.log(token)
			var req = {
				method: 'GET',
				url: 'http://localhost:3002/getIdentity',
				data:$scope.token,
				headers:{
					'Content-Type':'application/json',
				},
			};

			$http(req).then(function successCallback(response){

			},function errorCallback(response){

			});
		}

		var QueryString = function () {
		  // This function is anonymous, is executed immediately and 
		  // the return value is assigned to QueryString!
		  var query_string = {};
		  var query = window.location.search.substring(1);
		  var vars = query.split("&");
		  for (var i=0;i<vars.length;i++) {
		    var pair = vars[i].split("=");
		        // If first entry with this name
		    if (typeof query_string[pair[0]] === "undefined") {
		      query_string[pair[0]] = decodeURIComponent(pair[1]);
		        // If second entry with this name
		    } else if (typeof query_string[pair[0]] === "string") {
		      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
		      query_string[pair[0]] = arr;
		        // If third or later entry with this name
		    } else {
		      query_string[pair[0]].push(decodeURIComponent(pair[1]));
		    }
		  } 
		  return query_string;
		}();

		var req = {
				method:'POST',
				url:'http://localhost:3002/gettoken',
				data: QueryString,
				headers:{
					'Content-Type':'application/json',
				}
				};
		$http(req).then(function successCallback(response){
				var token;
				$scope.token = response.data;
				console.log($scope.token);
				getIdentity($scope.token);
				}, function errorCallback(response){
				console.log(response);
				});	
				
	}]);