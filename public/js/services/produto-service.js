var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('ProdutoService', ['$http', function($http) {
    var ProdutoService = {
        selectProduto : selectProduto,
        getProduto : getProduto,
        getProdutos : getProdutos
    };

    return ProdutoService;

    var serviceProduto = {};

    function getProduto(){
        return serviceProduto;
    }

    function selectProduto(produto) {
        serviceProduto = produto;
    };

    function getProdutos(){
        return $http.get('/v1/produto/get');
    }

}]);