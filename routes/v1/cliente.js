module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/cliente", function(req, res){
    	controllers.checkIn.post(req, res);
    });
  }

}