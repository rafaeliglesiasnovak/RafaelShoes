var app = angular.module('RafaelShoes');

app.directive('alterarcliente', ["$rootScope", "LoginService", function($rootScope, LoginService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.cadastrar = function(){
        // TODO: fazer sobreRafael
        $rootScope.viewFlag = 1;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/alterarcliente.html'
  };
}]);