module.exports = function (schema){
  var Cliente = schema.cliente;
  var Account = schema.account;

  return {
    cadastrar: function (req, res) {
      var account = req.body.account;
      var cliente = req.body.cliente;

      Account
        .findOrCreate({where: {username: account.email}, defaults: account})
        .spread(function(account, created) {

          if(!created) return res.json({success: false, message: 'Email já cadastrado.'});

          else{
            Cliente
              .findOrCreate({where: {username: cliente.email}, defaults: cliente})
              .spread(function(cliente, created) {

                if(!created) return res.json({success: false, message: 'Cliente já cadastrado.'});

                else{
                  return res.json({success: true, message: 'Cliente cadastrado com sucesso!', response: {cliente: cliente}});
                }
              });
          }
        });
    }
  }
}