module.exports = function (schema){
  var Cliente = schema.cliente;

  return {
    get: function (req, res) {

      var cliente = Cliente.build({
        CPF_Cli: 7,
        Nome_Cli: 'Rafael Brandão',
        Tel_Cel_Cli: '983269155',
        Senha_Cli: 'brandao.rafael@hotmail.com'
      })

      cliente.save();

      Cliente
        .all()
        .then(function(db) {
          if(db){
            return res.send(db);
          }
        });

    }
  }
}