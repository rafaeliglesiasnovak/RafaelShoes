module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/cliente/cadastrar", function(req, res){
      controllers.cliente.cadastrar(req, res);
    });
    router.get("/cliente/get", function(req, res){
    	controllers.cliente.get(req, res);
    });
    router.delete("/cliente/deletar", function(req, res){
    	controllers.cliente.delete(req, res);
    });
    router.post("/cliente/editar", function(req, res){
    	controllers.cliente.editar(req, res);
    });
  }

}