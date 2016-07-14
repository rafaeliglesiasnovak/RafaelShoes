angular.module('RafaelShoes', [
    'satellizer',
    'LocalStorageModule',
    'angular-md5'
    ])

.factory('sessionInjector', [function() {  
    var sessionInjector = {
        request: function(config) {

            config.headers['x-token-conta'] = localStorage.tokenConta;
            
            return config;
        }
    };
    return sessionInjector;
}])

.config(['$httpProvider', '$authProvider', function($httpProvider, $authProvider) {  
    $httpProvider.interceptors.push('sessionInjector');
    $authProvider.loginUrl = '/v1/login'; //end point do login
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

	$rootScope.api = "http://localhost:3000/"

    $rootScope.viewFlag = 1;

    // constantes das paginas
    $rootScope.home = 1;
    $rootScope.detalhe = 2;
    $rootScope.login = 3;
    $rootScope.cadastro = 4;
    $rootScope.produtos = 5;

    appCtrl.goTo = function(id){
        $rootScope.viewFlag = id;
    }

    appCtrl.goToCategoria = function(idProduto){
        // Salvar produto no service
        $rootScope.viewFlag = $rootScope.produtos;
    }

}])
;