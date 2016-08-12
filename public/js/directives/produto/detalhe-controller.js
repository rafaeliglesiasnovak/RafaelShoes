var app = angular.module('RafaelShoes');

app.directive('detalhe', ["$rootScope", "ProdutoService", "CarrinhoService",
 function($rootScope, ProdutoService, CarrinhoService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.produto = ProdutoService.getProduto();

      $scope.adicionarAoCarrinho = function(produto){
        CarrinhoService.addProduto(produto);
      }

      $scope.goToCarrinho = function(produto){
        CarrinhoService.addProduto(produto);
        $rootScope.viewFlag = $rootScope.carrinho;
      }

    	$scope.rootScope = $rootScope;
  	},
    templateUrl: 'views/directives/produto/detalhe.html'
  };
}]);