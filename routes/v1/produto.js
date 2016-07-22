module.exports = function (moduleProduto, upload){
  
  var controllers = moduleProduto.controllers;

  return function(router){
    router.post("/produto/cadastrar", upload.single('produto'), function(req, res){
    	controllers.produto.post(req, res);
    });

    router.get("/produto/get", function(req, res){
    	controllers.produto.get(req, res);
    });

    router.post("/produto/deletar", function(req, res){
    	controllers.produto.deletar(req, res);
    });

    router.post("/produto/editar", upload.single('produto'), function(req, res){
    	controllers.produto.editar(req, res);
    });
  }

}