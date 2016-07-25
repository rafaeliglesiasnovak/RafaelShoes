var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('CarrinhoService', ['$http', 'localStorageService', 'md5', function($http, localStorageService, md5) {
    var CarrinhoService = {
        // removeProduto : removeProduto,
        addProduto : addProduto,
        clearCarrinho : clearCarrinho,
        getCarrinho : getCarrinho
    };

    return CarrinhoService;

    var carrinho = new Array();

    function getCarrinho(){ 
        return carrinho;
    }

    function addProduto(produto) {
        if(!carrinho){
            carrinho = new Array();
        }
        carrinho.push(produto);
    };

    // function removeProduto(produto) {
    //     for (var item : carrinho){
    //         if(item.id == produto.id){
    //             carrinho.splice( carrinho.indexof(item), 1 );
    //         }
    //     }
    // }

    function clearCarrinho(){
        carrinho = new Array();
    }

}]);
