var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('CarinhoService', ['$http', 'localStorageService', 'md5', function($http, localStorageService, md5) {
    var CarinhoService = {
        // removeProduto : removeProduto,
        addProduto : addProduto,
        clearCarrinho : clearCarrinho
        
    };

    return CarinhoService;

    var carrinho = [];

    function getCarrinho(){
        return carrinho;
    }

    function addProduto(produto) {
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
