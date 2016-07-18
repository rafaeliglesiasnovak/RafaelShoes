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

      var produto1 = {
        nome: "Nike Air",
        img: "images/grid3.jpg",
        preco: "R$200,00"
      };
      var produto2 = {
        nome: "Nike Air",
        img: "images/grid4.jpg",
        preco: "R$230,00"
      };
      var produto3 = {
        nome: "Nike Air",
        img: "images/grid5.jpg",
        preco: "R$190,00"
      };
      var produto4 = {
        nome: "Nike Air",
        img: "images/grid6.jpg",
        preco: "R$180,00"
      };
      var produto5 = {
        nome: "Nike Air",
        img: "images/grid7.jpg",
        preco: "R$250,00"
      };
      var produto6 = {
        nome: "Nike Air",
        img: "images/grid8.jpg",
        preco: "R$280,00"
      };

      $scope.produtos1 = [produto1, produto2, produto3];

      $scope.produtos2 = [produto4, produto5, produto6];
  	},
    templateUrl: 'views/directives/home.html'
  };
}]);