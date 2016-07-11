var app = angular.module('RafaelShoes');

app.directive('produtos', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
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
    templateUrl: 'views/directives/produtos.html'
  };
}]);