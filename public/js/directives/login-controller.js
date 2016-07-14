var app = angular.module('RafaelShoes');

app.directive('login', ['$rootScope', 'localStorageService', 'md5', '$auth',
  function($rootScope, localStorageService, md5, $auth) {
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

        // Use Satellizer's $auth service to login
        $auth.login(credentials)
            .then(function(data) {
              var usuario = data.data.usuario;

              localStorageService.set('cpf', usuario.CPF_Cli);
              localStorageService.set('nome', usuario.Nome_Cli);
              localStorageService.set('celular', usuario.Tel_Cel_Cli);
              localStorageService.set('telefone', usuario.Tel_Res_Cli);
              localStorageService.set('data_nascimento', usuario.Dt_Nascimento_Cli);
              localStorageService.set('sexo', usuario.Sexo_Cli);
              localStorageService.set('email', usuario.Email_Cli);

              $rootScope.viewFlag = 1;

              })
            .catch(function(err) {
                console.dir(err);
            });
        }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/login.html'
  };
}]);