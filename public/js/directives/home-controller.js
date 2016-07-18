var app = angular.module('RafaelShoes');

app.directive('home', ["$rootScope", "localStorageService", function($rootScope, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      var email = localStorageService.get('email');
      if(email){
        $rootScope.isLogado = true;
      }

      $scope.goToDetalhe = function(){
        // TODO: passar produto para service
        $rootScope.viewFlag = $rootScope.detalhe;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }

      $scope.produtos1 = [1,2,3];
      $scope.produtos2 = [4,5,6];
  	},
    templateUrl: 'views/directives/home.html'
  };
}]);