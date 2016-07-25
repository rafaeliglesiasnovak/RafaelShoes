var app = angular.module('RafaelShoes');

app.directive('itemcarrinho', ["$rootScope", "ProdutoService", function($rootScope, ProdutoService) {
  return {
  	restrict: 'E',
    scope: true,
  	link: function($scope){

      $scope.rootScope = $rootScope;
      
      // TODO: retirar do carrinho
  	},
    templateUrl: 'views/directives/item-carrinho.html'
  };
}]);