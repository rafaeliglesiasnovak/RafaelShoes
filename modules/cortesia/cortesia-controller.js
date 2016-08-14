module.exports = function (schema){
	var Cortesia = schema.Cortesia;

  return {
    get: function (req, res) {
    	Cortesia.find().then(function(cortesiadb){
      		return res.json({cortesia: cortesiadb.Cortesia});
    	})
    },
    post: function(req, res){
    	Cortesia.update({Cortesia: req.body.Cortesia}, {where: {id: 1}}).then(function(){
			return res.json({success: true, message: 'Cortesia ediada com sucesso.', cortesia: req.body.Cortesia});
		})
    }
  }
}