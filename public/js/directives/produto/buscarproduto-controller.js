var app = angular.module('RafaelShoes');

app.directive('buscarproduto', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.buscar = function(){
        $http.get($rootScope.api + 'v1/produto/get?Nome_Prod=' + $scope.Nome_Prod).
          success(function(data){
            var produtos = data.response.produtos;
            window.alert("Produtos encontrado:\n" +
                          "ID: " + produtos[0].ID_Prod +
                          "\nNome: " + produtos[0].Nome_Prod +
                          "\nDescrição: " + produtos[0].Desc_Prod +
                          "\nFornecedor_Prod: " + produtos[0].Fornecedor_Prod +
                          "\nPreco_Prod: " + produtos[0].Preco_Prod);
          })
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/produto/buscarproduto.html'
  };
}]);