var app = angular.module('RafaelShoes');

app.directive('detalhe', ["$rootScope", "ProdutoService", "CarrinhoService", "$http", "localStorageService", 
 function($rootScope, ProdutoService, CarrinhoService, $http, localStorageService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.produto = ProdutoService.getProduto();

      $scope.produto.quantidade = "1";
      $scope.produto.tamanho = $scope.produto.Produto_Tamanhos[0].Tamanho_Prod.toString();

      $scope.adicionarAoCarrinho = function(produto){
        if(localStorageService.get('logado')){
          var body = {
            ID_Prod: produto.ID_Prod,
            CPF_Cli: localStorageService.get('cpf'),
            Qtd_Prod: parseInt(produto.quantidade),
            Tamanho_Prod: produto.tamanho
          }
          $http.post($rootScope.api + 'v1/carrinho/additem', body)
            .success(function(data){
              if(data.success){
                window.alert("Produto adicionado ao seu carrinho!");
              } else {
                //TODO
              }
            })
          } else {
            var atualizado = false;
            for(var i = 0; i < $rootScope.carrinho.length, i++){
              if($rootScope.carrinho[i].ID_Prod == produto.ID_Prod && $rootScope.carrinho[i].Tamanho_Prod == produto.Tamanho_Prod){
                $rootScope.carrinho[i].Qtd_Prod += produto.Qtd_Prod;
                atualizado = true;
              }
            }
            if(!atualizado){
              $rootScope.carrinho.push({
                ID_Prod: produto.ID_Prod,
                Tamanho_Prod: produto.Tamanho_Prod,
                Qtd_Prod: produto.Qtd_Prod,
                Produto: {
                  Preco_Prod: produto.Preco_Prod,
                  Imagem_Prod: produto.Imagem_Prod
                }
              });
            }
          }
      }

      $scope.goToCarrinho = function(produto){
        if(localStorageService.get('logado')){
          var body = {
            ID_Prod: produto.ID_Prod,
            CPF_Cli: localStorageService.get('cpf'),
            Qtd_Prod: parseInt(produto.quantidade),
            Tamanho_Prod: produto.tamanho
          }
          $http.post($rootScope.api + 'v1/carrinho/additem', body)
            .success(function(data){
              if(data.success){
              $rootScope.viewFlag = 7;
              } else {
                //TODO
              }
            })
          } else {
            var atualizado = false;
            for(var i = 0; i < $rootScope.carrinho.length, i++){
              if($rootScope.carrinho[i].ID_Prod == produto.ID_Prod && $rootScope.carrinho[i].Tamanho_Prod == produto.Tamanho_Prod){
                $rootScope.carrinho[i].Qtd_Prod += produto.Qtd_Prod;
                atualizado = true;
              }
            }
            if(!atualizado){
              $rootScope.carrinho.push({ID_Prod: produto.ID_Prod, Tamanho_Prod: produto.Tamanho_Prod, Qtd_Prod: produto.Qtd_Prod});
            }
            $rootScope.viewFlag = 7;
          }
      }

    	$scope.rootScope = $rootScope;
  	},
    templateUrl: 'views/directives/produto/detalhe.html'
  };
}]);