module.exports = function (moduleEndereco){
  
  var controllers = moduleEndereco.controllers;

  return function(router){
    router.post("/cadastrar-endereco", function(req, res){
      controllers.endereco.post(req, res);
    });
    router.get("/get-enderecos", function(req, res){
    	controllers.endereco.get(req, res);
    });
    router.post("/deletar-endereco", function(req, res){
    	controllers.endereco.deletar(req, res);
    });
    router.post("/editar-endereco", function(req, res){
    	controllers.endereco.editar(req, res);
    });
  }

}