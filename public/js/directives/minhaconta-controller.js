var app = angular.module('RafaelShoes');

app.directive('minhaconta', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.cadastrar = function(){
        // TODO: fazer minhaconta
        $rootScope.viewFlag = 1;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/minhaconta.html'
  };
}]);