module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/cliente", function(req, res){
    	controllers.cliente.post(req, res);
    });
  }

}