module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/cliente/cadastrar", function(req, res){
    	controllers.cadastro.cadastrar(req, res);
    });

    router.get("/cliente/cadastro", function(req, res){
    	controllers.cadastro.get(req, res);
    });
  }

}