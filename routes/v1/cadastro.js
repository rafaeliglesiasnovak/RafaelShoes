module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/cadastrar", function(req, res){
    	controllers.cadastro.cadastrar(req, res);
    });
  }

}