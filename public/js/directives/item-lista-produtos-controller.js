var app = angular.module('RafaelShoes');

app.directive('itemproduto', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
    scope: true,
  	link: function($scope){

      $scope.rootScope = $rootScope;
      
      $scope.goToDetalhe = function(){
        // TODO: passar produto para service
        $rootScope.viewFlag = $rootScope.detalhe;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/item-lista-produtos.html'
  };
}]);