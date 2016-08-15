var app = angular.module('RafaelShoes');

app.directive('cadastrarproduto', ["$rootScope", "LoginService", "localStorageService", "$http",
    function($rootScope, LoginService, localStorageService, $http) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      $scope.nome = localStorageService.get('nome').split(" ")[0];

      $scope.tamanhos = [{}];

      $scope.adicionarTamanho = function(){
        $scope.tamanhos.push({});
      }

      $scope.removerTamanho = function(tamanho){
        for(var i = 0; i < $scope.tamanhos.length; i++){
          if($scope.tamanhos[i] === tamanho){
            $scope.tamanhos.splice(i, 1);
          }
        }
      }

      $scope.cadastrar = function(){
        var body = {
          Nome_Prod: $scope.Nome_Prod,
          Desc_Prod: $scope.Desc_Prod,
          Fornecedor_Prod: $scope.Fornecedor_Prod,
          Peso_Prod: $scope.Peso_Prod,
          Larg_Prod: $scope.Larg_Prod,
          Comp_Prod: $scope.Comp_Prod,
          Alt_Prod: $scope.Alt_Prod,
          Preco_Prod: $scope.Preco_Prod,
          Cor_Prod: $scope.Cor_Prod,
          tamanhos: $scope.tamanhos
        }

        $http.post($rootScope.api + 'v1/produto/cadastrar', body)
          .success(function(data){
            window.alert("Produto cadastrado com sucesso!");
            $rootScope.viewFlag = localStorageService.get('home');
          })
      }

      $scope.logout = function(){
        LoginService.logout();
      }
      
      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/produto/cadastrarproduto.html'
  };
}]);