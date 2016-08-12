var app = angular.module('RafaelShoes');

app.directive('login', ['$rootScope', 'localStorageService', 'md5', 'LoginService',
  function($rootScope, localStorageService, md5, LoginService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.login = function(){
        var credentials = {
          // "Login": "2@hotmail.com",
          // "Senha": "c81e728d9d4c2f636f067f89cc14862c"
        }

        credentials.Login = $scope.email;
        credentials.Senha = md5.createHash($scope.senha || '');

        LoginService.login(credentials);
        }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/conta/login.html'
  };
}]);