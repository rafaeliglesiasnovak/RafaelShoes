var app = angular.module('RafaelShoes');

app.directive('detalhe', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;
  	},
    templateUrl: 'views/directives/detalhe.html'
  };
}]);