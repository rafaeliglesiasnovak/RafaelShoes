module.exports = function (moduleFuncionario){
  
  var controllers = moduleFuncionario.controllers;

  return function(router){
    router.post("/pedido/post", function(req, res){
    	controllers.pedido.post(req, res);
    });

    router.get("/pedido/get", function(req, res){
    	controllers.pedido.get(req, res);
    });
    router.delete("/pedido/deletar", function(req, res){
    	controllers.pedido.delete(req, res);
    });
    router.post("/pedido/editar", function(req, res){
    	controllers.pedido.update(req, res);
    });
  }
}