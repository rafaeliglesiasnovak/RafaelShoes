var app = angular.module('RafaelShoes');

app.directive('itemproduto', ["$rootScope", "ProdutoService", function($rootScope, ProdutoService) {
  return {
  	restrict: 'E',
    scope: true,
  	link: function($scope){

      $scope.rootScope = $rootScope;
      
      $scope.goToDetalhe = function(produto){
        console.log(produto);
        ProdutoService.selectProduto(produto);
        $rootScope.viewFlag = $rootScope.detalhe;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/item-lista-produtos.html'
  };
}]);