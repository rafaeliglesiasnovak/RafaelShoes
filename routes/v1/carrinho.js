module.exports = function (moduleCarrinho){
  
  var controllers = moduleCarrinho.controllers;

  return function(router){
    router.post("/carrinho/additem", function(req, res){
    	controllers.carrinho.addItem(req, res);
    });

    router.get("/carrinho/get", function(req, res){
    	controllers.carrinho.get(req, res);
    });

    router.post("/carrinho/delitem", function(req, res){
    	controllers.carrinho.delItem(req, res);
    });

    router.post("/carrinho/edititem", function(req, res){
        controllers.carrinho.editItem(req, res);
    });

    router.post("/carrinho/limpar", function(req, res){
        controllers.carrinho.limpar(req, res);
    });
  }

}