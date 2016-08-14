var app = angular.module('RafaelShoes');

app.directive('itemcarrinho', ["$rootScope", "ProdutoService", "localStorageService", "$http", function($rootScope, ProdutoService, localStorageService, $http) {
  return {
  	restrict: 'E',
    scope: {
    	produto: "=",
      	salvar: '=',
      	deletar: '=',
      	reset: '='
    },
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.salvar = function(){
        var body = {
          CPF_Cli: localStorageService.get('cpf'),
          ID_Prod: $scope.produto.ID_Prod,
          Qtd_Prod: $scope.produto.Qtd_Prod,
          Tamanho_Prod: $scope.produto.Tamanho_Prod
        }
        $http.post($rootScope.api + 'v1/carrinho/edititem', body)
          .success(function(data){
            $scope.reset();
          });
      }

      $scope.deletar = function(){
        var body = {
          CPF_Cli: localStorageService.get('cpf'),
          ID_Prod: $scope.produto.ID_Prod
        }
        $http.post($rootScope.api + 'v1/carrinho/delitem', body)
          .success(function(data){
            $scope.reset();
          });
      }
      // TODO: retirar do carrinho
  	},
    templateUrl: 'views/directives/carrinho/item-carrinho.html'
  };
}]);