var app = angular.module('RafaelShoes');

app.directive('alterarcliente', ["$rootScope", "LoginService", "localStorageService", 
    function($rootScope, LoginService, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.cadastrar = function(){
        // TODO: fazer sobreRafael
        $rootScope.viewFlag = 1;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/cliente/alterarcliente.html'
  };
}]);