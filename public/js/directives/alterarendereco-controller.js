var app = angular.module('RafaelShoes');

app.directive('alterarendereco', ["$rootScope", "$http", "localStorageService", function($rootScope, $http, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.enderecos = [];

      $scope.pegaEndereco = function(){
        $http.get($rootScope.api + 'v1/endereco/get?CPF_Cli=' + localStorageService.get('cpf'))
          .success(function(data){
            $scope.enderecos = data.response.enderecos;
          })
      }

      $scope.pegaEndereco();

      $scope.cadastrar = function(){
        // TODO: fazer sobreRafael
        $rootScope.viewFlag = 1;
      }

      $scope.goTo = function(id, index){
        $rootScope.endereco = $scope.enderecos[index];
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/alterarendereco.html'
  };
}]);