module.exports = function (moduleCadastro){
  
  var controllers = moduleCadastro.controllers;

  return function(router){
    router.get("/cadastro/get", function(req, res){
    	controllers.cadastro.get(req, res);
    });

    router.post("/cadastro/forgotsenha", function(req, res){
    	controllers.cadastro.forgotPassword(req, res);
    });
  }

}