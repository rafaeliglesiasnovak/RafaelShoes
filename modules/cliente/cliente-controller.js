module.exports = function (schema){
  var Cliente = schema.Cliente;

  return {
    get: function (req, res) {
      var CPF_Cli = req.query.CPF_Cli;

      var query = {};
      if(CPF_Cli){
        query.where = {CPF_Cli: CPF_Cli};
      }

      Cliente.findAll(query).then(function(clientes) {
        return res.json({success: true, message: 'Clientes encontrados.', response: {clientes: clientes}});
      });
    },

    delete: function (req, res){
      var CPF_Cli = req.query.CPF_Cli;

      Cliente.destroy({
        where: {
          CPF_Cli: CPF_Cli
        }
      }).then(function(){
        return res.json({success: true, message: 'Clientes excluido com sucesso.'});
      });
    },

    editar: function (req, res){
      var cliente = req.body.cliente;

      Cliente.update(cliente, {
        where: {
          CPF_Cli: cliente.CPF_Cli
        }
      }).then(function(){
        return res.json({success: true, message: 'Clientes editado com sucesso.'});
      });
    }
  }
}