module.exports = function (schema, bcrypt, crypto){
  var Cliente = schema.Cliente;
  var Account = schema.Account;
  var Carrinho = schema.Carrinho;
  var Funcionario = schema.Funcionario;

  return {
    cadastrar: function (req, res) {
      var account = req.body.account;
      var funcionario = req.body.funcionario;

      Cliente.find({where: {Email_Cli: funcionario.Email_Func }}).then(function(clienteDb){
        if(clienteDb) return res.json({success: false, message: 'Email já cadastrado.'});

        // encrypta senha
        bcrypt.hash(account.Senha, 4, function(err, hash) {
          account.Senha = hash;

          Funcionario
            .findOrCreate({where: {$or: [{Email_Func: funcionario.Email_Func}]}, defaults: funcionario})
            .spread(function(funcionarioDb, created) {

              if(!created) return res.json({success: false, message: 'Funcionario já cadastrado.'});

              else{

                account.ID_Func = funcionarioDb.ID_Func;

                Account
                  .findOrCreate({where: {Login: account.Login}, defaults: account})
                  .spread(function(accountDb, created) {

                    if(!created) return res.json({success: false, message: 'Email já cadastrado.'});

                    else{
                      return res.json({success: true, message: 'Funcionario cadastrado com sucesso!', response: {funcionario: funcionarioDb}});
                    }
                  });
              }
            });
        });
      });
    },

    get: function (req, res) {
      var ID_Func = req.query.ID_Func;

      var query = {};
      if(ID_Func){
        query.where = {ID_Func: ID_Func};
      }

      Funcionario.findAll(query).then(function(funcionarios) {
        return res.json({success: true, message: 'Funcionarios encontrados.', response: {funcionarios: funcionarios}});
      });
    },

    delete: function (req, res){
      var ID_Func = req.query.ID_Func;

      Funcionario.destroy({
        where: {
          ID_Func: ID_Func
        }
      }).then(function(){
        return res.json({success: true, message: 'Funcionario excluido com sucesso.'});
      });
    },

    editar: function (req, res){
      var funcionario = req.body.funcionario;

      var query = {where: {ID_Func: funcionario.ID_Func}};

      Funcionario.update(funcionario, query).then(function(funcionarioDb){
        Funcionario.findAll(query).then(function(funcionarios) {
          return res.json({success: true, message: 'Funcionario editado com sucesso.', response: {funcionarios: funcionarios}});
        });
      });
    }
  }
}