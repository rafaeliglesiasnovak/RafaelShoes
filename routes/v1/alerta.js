module.exports = function (moduleAlerta){
  
  var controllers = moduleAlerta.controllers;

  return function(router){
    router.post("/alerta/send", function(req, res){
    	controllers.alerta.send(req, res);
    });
  }

}