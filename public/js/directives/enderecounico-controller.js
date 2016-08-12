var app = angular.module('RafaelShoes');

app.directive('enderecounico', ["$rootScope", "LoginService","localStorageService", "$http", 
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.endereco = $rootScope.endereco;

      $scope.alterar = function(){
        var body ={endereco: $scope.endereco};
        $http.post($rootScope.api + 'v1/endereco/editar', body)
          .success(function(data){
            $rootScope.viewFlag = 29;
          });
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/enderecounico.html'
  };
}]);