module.exports = function (moduleEndereco){
  
  var controllers = moduleEndereco.controllers;

  return function(router){
    router.post("/endereco/cadastrar", function(req, res){
      controllers.endereco.post(req, res);
    });
    router.get("/endereco/get", function(req, res){
    	controllers.endereco.get(req, res);
    });
    router.post("/endereco/deletar", function(req, res){
    	controllers.endereco.deletar(req, res);
    });
    router.post("/endereco/editar", function(req, res){
    	controllers.endereco.editar(req, res);
    });
  }

}