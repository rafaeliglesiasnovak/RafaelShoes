module.exports = function (moduleContato){
  
  var controllers = moduleContato.controllers;

  return function(router){
    router.post("/contato/send", function(req, res){
    	controllers.contato.send(req, res);
    });
  }

}