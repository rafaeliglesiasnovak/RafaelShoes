var app = angular.module('RafaelShoes');

app.directive('cadastrarendereco', ["$rootScope", "$http", "localStorageService", "LoginService", 
    function($rootScope, $http, localStorageService, LoginService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.endereco = {};

      $scope.cadastrar = function(){
        $scope.endereco.CPF_Cli = localStorageService.get('cpf');
        var body ={endereco: $scope.endereco};
        $http.post($rootScope.api + 'v1/endereco/cadastrar', body)
          .success(function(data){
            if(data.success){
              $rootScope.viewFlag = 9;
            } else {
              window.alert("Você já possui 3 endereços cadastrados");
              $rootScope.viewFlag = 9;
            }
          })
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/cadastrarendereco.html'
  };
}]);