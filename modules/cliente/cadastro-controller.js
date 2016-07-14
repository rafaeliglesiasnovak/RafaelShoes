module.exports = function (schema, bcrypt, crypto){
  var Cliente = schema.Cliente;
  var Account = schema.Account;

  return {
    cadastrar: function (req, res) {
      var account = req.body.account;
      var cliente = req.body.cliente;

      var md5 = crypto.createHash('md5').update(account.Senha).digest("hex");

      // encrypta senha
      bcrypt.hash(md5, 4, function(err, hash) {
        account.Senha = hash;

        Cliente
          .findOrCreate({where: {$or: [{Email_Cli: cliente.Email_Cli}]}, defaults: cliente})
          .spread(function(clienteDb, created) {

            if(!created) return res.json({success: false, message: 'Cliente já cadastrado.'});

            else{
              Account
                .findOrCreate({where: {Login: account.Login}, defaults: account})
                .spread(function(accountDb, created) {

                  if(!created) return res.json({success: false, message: 'Email já cadastrado.'});

                  else{
                    return res.json({success: true, message: 'Cliente cadastrado com sucesso!', response: {cliente: clienteDb}});
                  }
                });
            }
          });
      });
    },
    get: function (req, res) {
      var Login = req.query.Login;

      var query = {};
      if(Login){
        query.where = {Login: Login};
      }

      Account.findAll(query).then(function(accounts) {
        return res.json({success: true, message: 'Contas encontrados.', response: {contas: accounts}});
      });
    }
  }
}