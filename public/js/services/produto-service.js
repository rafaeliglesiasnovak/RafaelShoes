var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('ProdutoService', [function() {
    var ProdutoService = {
        selectProduto : selectProduto,
        getProduto : getProduto
    };

    return ProdutoService;

    var produto = {};

    function getProduto(){
        return produto;
    }

    function selectProduto(produto) {
        produto = produto;
    };

}]);