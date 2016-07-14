module.exports = function (moduleUsuario){
  
  var controllers = moduleUsuario.controllers;

  return function(router){
    router.post("/login", function(req, res){
    	controllers.login.post(req, res);
    });
  }

}