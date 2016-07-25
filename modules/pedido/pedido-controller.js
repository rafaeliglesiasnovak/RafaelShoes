module.exports = function (schema){
    var Pedido = schema.Pedido;

  return {
    post: function(req, res){
        var pedido = req.body;

        Pedido.create(pedido).then(function(pedidoDb){
            if(pedidoDb) return res.json({success: true, message: 'Pedido criado com sucesso!', response: {pedido: pedidoDb}});
        
            else return res.json({success: false, message: 'Falha no registro do pedido.'});
        })
    },

    get: function (req, res) {
    },

    update: function (req, res){
    },

    delete: function (req, res){
    }
  }
}