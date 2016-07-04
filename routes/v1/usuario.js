module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/login", function(req, res){
    	controllers.login.post(req, res);
    });
  }

}