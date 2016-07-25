module.exports = function (moduleFuncionario){
  
  var controllers = moduleFuncionario.controllers;

  return function(router){
    router.post("/funcionario/cadastrar", function(req, res){
    	controllers.funcionario.cadastrar(req, res);
    });

    router.get("/funcionario/get", function(req, res){
    	controllers.funcionario.get(req, res);
    });
    router.delete("/funcionario/deletar", function(req, res){
    	controllers.funcionario.delete(req, res);
    });
    router.post("/funcionario/editar", function(req, res){
    	controllers.funcionario.editar(req, res);
    });
  }
}