module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/get", function(req, res){
    	controllers.cliente.get(req, res);
    });
  }

}