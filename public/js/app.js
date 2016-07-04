angular.module('bigode', [])

.factory('sessionInjector', [function() {  
    var sessionInjector = {
        request: function(config) {

            config.headers['x-token-conta'] = localStorage.tokenConta;
            
            return config;
        }
    };
    return sessionInjector;
}])

.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('sessionInjector');
}])

.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
})

.controller("appController", ["$rootScope", function($rootScope){
	var appCtrl = this;

	localStorage.isBillOpened = false;
	$rootScope.isBillOpened = false;

	$rootScope.api = "http://localhost:3000/"

	$rootScope.isBillOpened = localStorage.isBillOpened;

	if(localStorage.isBillOpened == "true"){
		localStorage.stage = 1;
		$rootScope.stage = localStorage.stage;
	} else {
		localStorage.stage = 0;
		$rootScope.stage = localStorage.stage;
	}

}])
;