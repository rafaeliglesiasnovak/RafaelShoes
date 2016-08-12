var app = angular.module('RafaelShoes');

app.directive('login', ['$rootScope', 'localStorageService', 'md5', 'LoginService', '$http',
  function($rootScope, localStorageService, md5, LoginService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.login = function(){
        var Senha = md5.createHash($scope.Senha);
        $http.post($rootScope.api + 'v1/login/', {Login: $scope.Email, Senha: Senha})
          .success(function(data){
            if(data.success == false){
              window.alert("Login invalido!");
            } else {
              var usuario = data.usuario;

              localStorageService.set('cpf', usuario.CPF_Cli);
              localStorageService.set('nome', usuario.Nome_Cli);
              localStorageService.set('celular', usuario.Tel_Cel_Cli);
              localStorageService.set('telefone', usuario.Tel_Res_Cli);
              localStorageService.set('data_nascimento', usuario.Dt_Nascimento_Cli);
              localStorageService.set('sexo', usuario.Sexo_Cli);
              localStorageService.set('email', usuario.Email_Cli);
              $rootScope.isLogado = true;

              $rootScope.viewFlag = 1;
            }
          });
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/login.html'
  };
}]);