module.exports = function (schema){
  var Cliente = schema.cliente;

  return {
    get: function (req, res) {
      Cliente.findAll().then(function(clientes) {
        return res.json({success: false, message: 'Clientes encontrados.', response: {clientes: clientes}});
      })

    }
  }
}