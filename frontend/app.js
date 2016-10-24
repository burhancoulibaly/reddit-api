var  PageApp = angular.module('AppPage',['ngRoute']);
	PageApp.controller('AppCtrl',['$scope','$http',($scope,$http)=>{

		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		
		var req = {
				method:'POST',
				url:'https://www.reddit.com/api/v1/access_token',
				data:'grant_type=authorization_code&code=CODE&redirect_uri=https://127.0.0.1:8080/frontend/app.html',
				headers:{
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
				}
				};
		$http(req).then(function successCallback(response){
				console.log(response);
				}, function errorCallback(response){
				console.log(response);
				});					
	}]);