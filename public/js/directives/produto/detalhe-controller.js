var app = angular.module('RafaelShoes');

app.directive('detalhe', ["$rootScope", "ProdutoService", "CarrinhoService", "$http", "localStorageService", 
 function($rootScope, ProdutoService, CarrinhoService, $http, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.produto = ProdutoService.getProduto();

      $scope.produto.quantidade = "1";

      $scope.adicionarAoCarrinho = function(produto){
        var body = {
          ID_Prod: produto.ID_Prod,
          CPF_Cli: localStorageService.get('cpf'),
          Qtd_Prod: parseInt(produto.quantidade)
        }
        $http.post($rootScope.api + 'v1/carrinho/additem', body)
          .success(function(data){
            if(data.success){
              window.alert("Produto adicionado ao seu carrinho!");
            } else {
              //TODO
            }
          })
      }

      $scope.goToCarrinho = function(produto){
        var body = {
          ID_Prod: produto.ID_Prod,
          CPF_Cli: localStorageService.get('cpf'),
          Qtd_Prod: parseInt(produto.quantidade)
        }
        $http.post($rootScope.api + 'v1/carrinho/additem', body)
          .success(function(data){
            if(data.success){
              $rootScope.viewFlag = 7;
            } else {
              //TODO
            }
          })
      }

    	$scope.rootScope = $rootScope;
  	},
    templateUrl: 'views/directives/produto/detalhe.html'
  };
}]);