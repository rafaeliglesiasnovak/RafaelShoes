module.exports = function (schema){
  var Cliente = schema.Cliente;
  var Account = schema.Account;

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
        return res.json({success: true, message: 'Cliente excluido com sucesso.'});
      });
    },

    editar: function (req, res){
      var cliente = req.body.cliente;
      var account = req.body.account;

      var query = {where: {CPF_Cli: cliente.CPF_Cli}};

      if(account.Senha){
        bcrypt.hash(account.Senha, 4, function(err, hash) {
          account.Senha = hash;
          Account.find({where:{Login: cliente.Email_Cli}}).then(function(accountDb){
            if(accountDb){
              return res.json({success: false, message: 'Email já cadastrado.'});
            } else {
              Cliente.update(cliente, query).then(function(){
                Account.update(account, query).then(function(){
                  Cliente.find(query).then(function(clienteDb) {
                    return res.json({success: true, message: 'Cliente editado com sucesso.', response: {cliente: clienteDb}});
                  });
                });
              });
            }
          });
        });
      } else {
        Account.find({where:{Login: cliente.Email_Cli}}).then(function(accountDb){
          if(accountDb){
            return res.json({success: false, message: 'Email já cadastrado.'});
          } else {
            Cliente.update(cliente, query).then(function(){
              Account.update(account, query).then(function(){
                Cliente.find(query).then(function(clienteDb) {
                  return res.json({success: true, message: 'Cliente editado com sucesso.', response: {cliente: clienteDb}});
                });
              });
            });
          }
        }); 
      }
    }
  }
}