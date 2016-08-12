var app = angular.module('RafaelShoes');

app.directive('produtos', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      
      var produto1 = {
        nome: "Nike Air 1",
        img: "images/grid3.jpg",
        preco: "R$200.00"
      };
      var produto2 = {
        nome: "Nike Air 2",
        img: "images/grid4.jpg",
        preco: "R$230.00"
      };
      var produto3 = {
        nome: "Nike Air 3",
        img: "images/grid5.jpg",
        preco: "R$190.00"
      };
      var produto4 = {
        nome: "Nike Air 4",
        img: "images/grid6.jpg",
        preco: "R$180.00"
      };
      var produto5 = {
        nome: "Nike Air 5",
        img: "images/grid7.jpg",
        preco: "R$250.00"
      };
      var produto6 = {
        nome: "Nike Air 6",
        img: "images/grid8.jpg",
        preco: "R$280.00"
      };
      var produto7 = {
        nome: "Nike Air 7",
        img: "images/grid9.jpg",
        preco: "R$180.00"
      };
      var produto8 = {
        nome: "Nike Air 8",
        img: "images/grid10.jpg",
        preco: "R$250.00"
      };
      var produto9 = {
        nome: "Nike Air 9",
        img: "images/grid11.jpg",
        preco: "R$280.00"
      };

      $scope.produtos1 = [produto1, produto2, produto3];

      $scope.produtos2 = [produto4, produto5, produto6];

      $scope.produtos3 = [produto7, produto8, produto9];
      
      $scope.goToDetalhe = function(){
        // TODO: passar produto para service
        $rootScope.viewFlag = $rootScope.detalhe;
      }

      $scope.goTo = function(id){
        $rootScope.viewFlag = id;
      }
  	},
    templateUrl: 'views/directives/produtos.html'
  };
}]);