var app = angular.module('RafaelShoes');

app.directive('home', ["$rootScope", "localStorageService", "ProdutoService", 
    function($rootScope, localStorageService, ProdutoService) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      var email = localStorageService.get('email');
      if(email){
        $rootScope.isLogado = true;
      }

      $scope.goToDetalhe = function(produto){
        // TODO: passar produto para service
        ProdutoService.selectProduto(produto);
        $rootScope.viewFlag = $rootScope.detalhe;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }

      var produtos = [];
      var produtos1 = [];
      var produtos2 = [];

      ProdutoService.getProdutos()
        .success(function(data){
          console.log(data);
            if(data.success == true){
                produtos = data.response.produtos;
                console.log(produtos);

                if(produtos.length > 2){
                  console.log('entrou');
                  for(var i=0; i < 3; i ++){
                    console.log('push');
                    produtos1.push(produtos[i]);
                  }
                }

                if(produtos.length > 5){
                  for(var i=0; i < 3; i ++){
                    produtos2.push(produtos[i + 3]);
                  }
                }

                $scope.produtos1 = produtos1;
                console.log(produtos1);

                $scope.produtos2 = produtos2;
            }
            else{
                console.dir("Erro get feed");
            }
        })
        .error(function(err) {
            console.dir("Erro get feed");
        });

      
  	},
    templateUrl: 'views/directives/home.html'
  };
}]);