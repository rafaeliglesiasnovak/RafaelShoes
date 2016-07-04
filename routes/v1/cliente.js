module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.get("/get", function(req, res){
    	controllers.cliente.get(req, res);
    });
    router.post("/deletar", function(req, res){
    	controllers.cliente.delete(req, res);
    });
    router.post("/editar", function(req, res){
    	controllers.cliente.editar(req, res);
    });
  }

}