var app = angular.module('RafaelShoes');

app.directive('carrinho', ["$rootScope", "CarrinhoService", "LoginService", function($rootScope, CarrinhoService, LoginService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.produtos = CarrinhoService.getCarrinho();
      console.log($scope.produtos);

      $scope.cadastrar = function(){
        // TODO: fazer carrinho
        $rootScope.viewFlag = 1;
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/carrinho.html'
  };
}]);