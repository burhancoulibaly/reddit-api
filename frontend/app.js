var  PageApp = angular.module('AppPage',['ngRoute']);
	PageApp.controller('AppCtrl',['$scope','$http',($scope,$http,$interval)=>{
		var count = 0;

		getTokenCallback = function(data){
			var token = data;
			getIdentity(token);
			getMessages(token);
			$scope.refreshMessages = function(){
				getMessages(token);
			}
			setInterval(function(){getMessages(token);},30000);
		}
		getIdentityCallback = function(data){
			identity = data;
			comment_karma = identity.comment_karma;
			name = identity.name;
			isEmailVerified = identity.has_verified_email;
			over_18 = identity.over_18;

			if(isEmailVerified == true && over_18 == true){
				$scope.message = "Username: "+name+"\n\nKarma: "+comment_karma+"\n \nEmail Status: Email is verified\n\nAge Status: Over 18";
			};
			if(isEmailVerified == false && over_18 == false){
				$scope.message = "Username: "+name+"\n\nKarma: "+comment_karma+"\n\nEmail Status: Email is not verified\n\nAge Status: Not over 18";
			};
			if(isEmailVerified == true && over_18 == false){
				$scope.message = "Username: "+name+"\n\nKarma: "+comment_karma+"\n\nEmail Status: Email is verified\n\nAge Status: Not over 18";
			};
			if(isEmailVerified == false && over_18 == true){
				$scope.message = "Username: "+name+"\n\nKarma: "+comment_karma+"\n\nEmail Status: Email is not verified\n\nAge Status: Over 18";
			};
			return identity;

		};
		getMessagesCallback = function(data){
			var messages = data.data.children;
			var newMessages=[];
			var newMessagesArray = [];
			var itwo = 0;
			if(count > 0 && messages[0].data.body !== messageBodies[0]){
				i = 0;
			do{
			  	
				// Get the snackbar DIV
    			var x = document.getElementById("snackbar")

   				// Add the "show" class to DIV
    			x.className = "show";

    			// After 3 seconds, remove the show class from DIV
    			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    			newMessagesArray.push("New Message\nFrom: "+messages[i].data.author+"\nMessage: "+messages[i].data.body);

    			$scope.newMessages = newMessagesArray;
    			
    			i++;

    			if(messages[i].data.body == messageBodies[0]){
    				itwo = 2;
    			};
    		 } while(itwo < 1);
			};
			var author=[];
			var messageArray=[];
			messageBodies=[];
			for(var i = 0; i < messages.length; i++){
				author.push(messages[i].data.author);
				messageBodies.push(messages[i].data.body);
				messageArray.push("From: "+author[i]+"\nMessage: "+messageBodies[i]);
			}
			$scope.messages = messageArray;
			count++;
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

		$scope.openLeftNav = function(){
			document.getElementById("leftSidenav").style.width = "250px";
    		document.getElementById("main").style.marginLeft = "250px";
    		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		}
		$scope.closeLeftNav = function(){
			document.getElementById("leftSidenav").style.width = "0";
    		document.getElementById("main").style.marginLeft = "0";
    		document.body.style.backgroundColor = "white";
		}
		$scope.openMesNav = function(){
			document.getElementById("mesSidenav").style.width = "300px";
    		document.getElementById("main").style.marginLeft = "300px";
    		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		}
		$scope.closeMesNav = function(){
			document.getElementById("mesSidenav").style.width = "0";
    		document.getElementById("main").style.marginLeft = "0";
    		document.body.style.backgroundColor = "white";
		}
		
				
	}]);