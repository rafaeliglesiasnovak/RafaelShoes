var app = angular.module('RafaelShoes');

app.directive('login', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.login = function(){
        // TODO: fazer login
        $rootScope.viewFlag = 1;
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/login.html'
  };
}]);