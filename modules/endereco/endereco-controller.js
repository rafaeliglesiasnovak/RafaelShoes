module.exports = function (schema){
  var Cliente = schema.Cliente;
  var Endereco = schema.Endereco;

  return {
    post: function(req, res){
      var endereco = req.body;

      Endereco.create(endereco).then(function(endereco) {

        if(endereco) return res.json({success: true, message: 'Endereço criado com sucesso!', response: {endereco: endereco}});

        else return res.json({success: false, message: 'Falha no registro do endereço.'});
      });

    },

    get: function (req, res) {
      var CPF_Cli = req.params.CPF_Cli;

      Endereco.findAll({
        where: {
          CPF_Cli: CPF_Cli
        }
      }).then(function(enderecos) {
        return res.json({success: true, message: 'Endereços encontrados.', response: {enderecos: enderecos}});
      });
    },

    deletar: function (res, res){
      var ID_End = res.body.ID_End;

      Endereco.destroy({
        where: {
          ID_End: ID_End
        }
      });
    },

    editar: function (req, res){
      var endereco = req.body;

      Endereco.update(endereco, {
        where: {
          ID_End: endereco.ID_End
        }
      });
    }
  }
}