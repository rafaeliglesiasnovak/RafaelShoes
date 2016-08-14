var app = angular.module('RafaelShoes');

app.directive('buscarcliente', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.buscar = function(){
        $http.get($rootScope.api + 'v1/cliente/get?Email_CLi=' + $scope.email).
          success(function(data){
            $scope.clientes = data.response.clientes;
          })
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/cliente/buscarcliente.html'
  };
}]);