module.exports = function (schema, bcrypt, crypto){
  var Cliente = schema.Cliente;
  var Account = schema.Account;
  var Funcionario = schema.Funcionario;
  var PedidoFuncionarioQnt = schema.PedidoFuncionarioQnt;

  return {
    cadastrar: function (req, res) {
      var account = req.body.account;
      var funcionario = req.body.funcionario;

      var md5 = crypto.createHash('md5').update(Senha).digest("hex");
      // encrypta senha
      bcrypt.hash(md5, 4, function(err, hash) {
        account.Senha = hash;

        Account.find({where: {Login: account.Login}}).then(function(emailCadastrado){
          if(emailCadastrado){
            return res.json({success: false, message: 'Email já cadastrado.'});
          } else {
            Funcionario.create(funcionario).then(function(funcionarioDb){
              PedidoFuncionarioQnt.create({ID_Func: funcionarioDb.ID_Func, Qnt_Pedidos: 0}).then(function(){
                account.ID_Func = funcionarioDb.ID_Func;
                Account.create(account).then(function(accountDb){
                  return res.json({success: true, message: 'Funcionario cadastrado com sucesso!', response: {funcionario: funcionarioDb}});
                });
              });
            });
          }
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
      var account = req.body.account;

      var query = {where: {ID_Func: funcionario.ID_Func}};

      if(account.Senha){
        bcrypt.hash(account.Senha, 4, function(err, hash) {
          account.Senha = hash;
          Account.find({where:{Login: funcionario.Email_Func}}).then(function(accountDb){
            if(accountDb){
              return res.json({success: false, message: 'Email já cadastrado.'});
            } else {
              Funcionario.update(funcionario, query).then(function(){
                Account.update(account, query).then(function(){
                  Funcionario.find(query).then(function(funcionarioDb) {
                    return res.json({success: true, message: 'Funcionario editado com sucesso.', response: {funcionario: funcionarioDb}});
                  });
                });
              });
            }
          });
        });
      } else {
        Account.find({where:{Login: funcionario.Email_Func}}).then(function(accountDb){
          if(accountDb){
            return res.json({success: false, message: 'Email já cadastrado.'});
          } else {
            Funcionario.update(funcionario, query).then(function(){
              Account.update(account, query).then(function(a){
                Funcionario.find(query).then(function(funcionarioDb) {
                    return res.json({success: true, message: 'Funcionario editado com sucesso.', response: {funcionario: funcionarioDb}});
                });
              });
            });
          }
        }); 
      }
    }
  }
}