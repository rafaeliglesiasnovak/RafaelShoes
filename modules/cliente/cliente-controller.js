module.exports = function (schema){
  var Cliente = schema.cliente;

  return {
    get: function (req, res) {
      Cliente.findAll().then(function(clientes) {
        return res.json({success: true, message: 'Clientes encontrados.', response: {clientes: clientes}});
      });
    },

    delete: function (res, res){
      var id = res.body.id;

      Cliente.destroy({
        where: {
          id: id
        }
      });
    },

    editar: function (req, res){
      var cliente = req.body;

      Cliente.update(cliente, {
        where: {
          id: cliente.id
        }
      });
    }
  }
}