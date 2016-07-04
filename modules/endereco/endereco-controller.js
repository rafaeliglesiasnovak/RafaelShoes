module.exports = function (schema){
  var Cliente = schema.cliente;
  var Endereco = schema.endereco;

  return {
    post: function(req, res){
      var endereco = req.body;

      Endereco.create(endereco).then(function(endereco) {

        if(endereco) return res.json({success: true, message: 'Endereço criado com sucesso!', response: {endereco: endereco}});

        else return res.json({success: false, message: 'Falha no registro do endereço.'});
      });

    },

    get: function (req, res) {
      var cliente_id = req.params.cliente_id;

      Endereco.findAll({
        where: {
          cliente_id: cliente_id
        }
      }).then(function(enderecos) {
        return res.json({success: true, message: 'Endereços encontrados.', response: {enderecos: enderecos}});
      });
    },

    deletar: function (res, res){
      var id = res.body.id;

      Endereco.destroy({
        where: {
          id: id
        }
      });
    },

    editar: function (req, res){
      var endereco = req.body;

      Endereco.update(endereco, {
        where: {
          id: endereco.id
        }
      });
    }
  }
}