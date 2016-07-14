var app = angular.module('RafaelShoes');

app.directive('cadastro', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.cadastrar = function(){
        // TODO: fazer cadastro
        $rootScope.viewFlag = 1;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/cadastro.html'
  };
}]);