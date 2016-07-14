var app = angular.module('RafaelShoes');

app.directive('cadastro', ["$rootScope", "CadastroService", function($rootScope, CadastroService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.usuario = {};

      $scope.cadastrar = function(){
        CadastroService.cadastrar($scope.usuario)
          .success(function(data) {
            $rootScope.viewFlag = 1;
            // TODO fazer login
          })
          .error(function(err) {
                // TODO: tratar erro
          });
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/cadastro.html'
  };
}]);