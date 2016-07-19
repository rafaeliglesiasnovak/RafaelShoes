module.exports = function (schema){
  var Cliente = schema.Cliente;
  var Endereco = schema.Endereco;

  return {
    post: function(req, res){
      var endereco = req.body.endereco;

      Endereco.findAndCountAll({ where: {CPF_Cli: endereco.CPF_Cli}})
        .then(function(result){
          if(result.count >= 3){
            return res.json({success: false, message: 'Cliente já possui 3 endereços cadastrados.'});
          } else {
            Endereco.create(endereco).then(function(enderecoDb) {

              if(enderecoDb) return res.json({success: true, message: 'Endereço criado com sucesso!', response: {endereco: enderecoDb}});
              
              else return res.json({success: false, message: 'Falha no registro do endereço.'});
            });
          }
        });
    },

    get: function (req, res) {
      var CPF_Cli = req.query.CPF_Cli;

      query = {};
      if(CPF_Cli){
        query.where.CPF_Cli = CPF_Cli;
      }

      Endereco.findAll(query).then(function(enderecos) {
        return res.json({success: true, message: 'Endereços encontrados.', response: {enderecos: enderecos}});
      });
    },

    deletar: function (req, res){
      var ID_End = req.query.ID_End;

      Endereco.destroy({
        where: {
          ID_End: ID_End
        }
      }).then(function(){
        return res.json({success: true, message: 'Endereço excluido com sucesso.'});
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