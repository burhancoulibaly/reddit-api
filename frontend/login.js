var LoginPage = angular.module('LoginPage',['ngRoute']);
	LoginPage.controller('LoginCtrl',function($scope, $location){
		$scope.link="https://www.reddit.com/api/v1/authorize?client_id=OiJpHsTjbvJndQ&response_type=code&state=Test-Response&redirect_uri=http://127.0.0.1:8080/frontend/app.html&duration=temporary&scope=identity"
		console.log($scope.link)
	});