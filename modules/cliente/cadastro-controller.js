module.exports = function (schema, bcrypt, crypto){
  var Cliente = schema.Cliente;
  var Account = schema.Account;
  var Funcionario = schema.Funcionario;

  return {
    cadastrar: function (req, res) {
      var account = req.body.account;
      var cliente = req.body.cliente;

      // encrypta senha
      bcrypt.hash(account.Senha, 4, function(err, hash) {
        account.Senha = hash;

        Account.find({where: {Login: account.Login}}).then(function(emailCadastrado){
          if(emailCadastrado){
            return res.json({success: false, message: 'Email já cadastrado.'});
          } else {
            Cliente.findOrCreate({where: {CPF_Cli: cliente.CPF_Cli}, defaults: cliente}).spread(function(clienteDb, created){
              if(!created){
                return res.json({success: false, message: 'CPF já cadastrado.'});
              } else {
                Account.create(account).then(function(accountDb){
                  return res.json({success: true, message: 'Cliente cadastrado com sucesso!', response: {cliente: clienteDb}});
                });
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