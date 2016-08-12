var app = angular.module('RafaelShoes');

app.directive('cadastro', ["$rootScope", "LoginService", "CadastroService", "md5",
    function($rootScope, LoginService, CadastroService, md5) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.usuario = {};

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.cadastrar = function(){
        CadastroService.cadastrar($scope.usuario)
          .success(function(data) {
            var credentials = {};

            credentials.Login = $scope.usuario.email;
            credentials.Senha = md5.createHash($scope.usuario.senha || '');

            LoginService.login(credentials);
          })
          .error(function(err) {
                // TODO: tratar erro
          });
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/conta/cadastro.html'
  };
}]);