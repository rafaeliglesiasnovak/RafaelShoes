module.exports = function (moduleCortesia){
  
  var controllers = moduleCortesia.controllers;

  return function(router){
    router.get("/cortesia/get", function(req, res){
    	controllers.cortesia.get(req, res);
    });

    router.post("/cortesia/post", function(req, res){
    	controllers.cortesia.post(req, res);
    });
  }

}