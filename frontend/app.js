var  PageApp = angular.module('AppPage',['ngRoute']);
	PageApp.controller('AppCtrl',['$scope','$http',($scope,$http)=>{

		getTokenCallback = function(data){
			var token = data;
			getIdentity(token);
			getMessages(token);
		}
		getIdentityCallback = function(data){
			identity = data;
			comment_karma = identity.comment_karma;
			name = identity.name;
			isEmailVerified = identity.has_verified_email;
			over_18 = identity.over_18;

			if(isEmailVerified == true && over_18 == true){
				$scope.message = "This is "+name+" he has "+comment_karma+" karma, his email is verified, and he is over 18";
			};
			if(isEmailVerified == false && over_18 == false){
				$scope.message = "This is "+name+" he has "+comment_karma+" karma, his email is not verified, and he is not over 18";
			};
			return identity;

		};
		getMessagesCallback = function(data){
			var messages = data;
			return messages;
		}
		
		getIdentity = function(token){
			console.log(token);
			var req = {
				method: 'POST',
				url: 'http://localhost:3002/getIdentity',
				data: token,
				headers:{
					'Content-Type':'application/json',
				},
			};

			$http(req).then(function successCallback(response){
				identity = getIdentityCallback(response.data);
				console.log(identity);
			},function errorCallback(response){
				console.log(response);
			});

		};

		getMessages = function(token){
			var req = {
				method: 'POST',
				url:'http://localhost:3002/getMessages',
				data:token,
				headers:{
					'Content-Type':'application/json',
				},
			};

			$http(req).then(function successCallback(response){
				messages = getMessagesCallback(response.data);
				console.log(messages);
			},function errorCallback(reponse){
				console.log(response);
			});			
		};

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
		getToken = function(){
			var req = {
				method:'POST',
				url:'http://localhost:3002/getToken',
				data: QueryString,
				headers:{
					'Content-Type':'application/json',
				}
				};
		$http(req).then(function successCallback(response){
				getTokenCallback(response.data);
				}, function errorCallback(response){
					console.log(response);
				});
		}

		getToken();
		
				
	}]);