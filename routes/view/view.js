module.exports = function (path){

  return function(router){
    router.get("/", function(req, res){
    	res.render(path.resolve('views/teste.html'));
    });
  }

}