var app = angular.module('RafaelShoes');

app.directive('alterarcliente', ["$rootScope", "LoginService", "localStorageService", "$http", "md5",
  function($rootScope, LoginService, localStorageService, $http, md5) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.cliente = {
        CPF_Cli: localStorageService.get('cpf'),
        Nome_Cli: localStorageService.get('nome'),
        Tel_Cel_Cli: localStorageService.get('celular'),
        Tel_Res_Cli: localStorageService.get('telefone')
      }

      $scope.account = {};

      $scope.salvar = function(){
        if($scope.account.Senha){
          $scope.account.Senha = md5.createHash($scope.account.Senha);
        }
        $scope.account.Login = $scope.cliente.Email;
        var body = {
          cliente: $scope.cliente,
          account: $scope.account
        }
        $http.post($rootScope.api + 'v1/cliente/editar', body)
          .success(function(data){
            $rootScope.viewFlag = 9;
          });
      }

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
    templateUrl: 'views/directives/cliente/alterarcliente.html'
  };
}]);