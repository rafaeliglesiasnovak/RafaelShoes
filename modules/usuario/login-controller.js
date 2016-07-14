module.exports = function (schema, bcrypt, jwt, config){

  var Account = schema.Account;
  var Cliente = schema.Cliente;

  return {
    post: function (req, res) {
      var Login = req.body.Login;

      // Procura usuario no banco
      var query = { where: {Login: Login} };

      Account.findOne(query).then(function(account) {
        if (!account) {
          // account nao encontrado
          return res.json({success: false, message: 'Falha na autenticação. Conta não encontrada.'});

        } 
        else if (account) {
          // compara passwords (com criptografia)
          bcrypt.compare(req.body.Senha, account.Senha, function(err, match) {
            if(!match){
              // passwords nao batem
              return res.json({success: false, message: 'Falha na autenticação. Senha incorreta.'});
            }
            else{
                // account e password batem
              var tokenSecret = config.apiSecret();
              // cria token
              var token = jwt.sign(account.Login, tokenSecret);
              
              query = { where: {Email_Cli: Login} };

              Cliente.findOne(query).then(function(cliente){
                  if(cliente){
                      return res.json({
                      success : true,
                      message : 'sucesso no login.',
                      token : token,
                      usuario: cliente
                    });
                  }
                  else return res.json({success: false, message: 'Falha na autenticação. Usuário não encontrado.'});
              });
            }
          });
        }
      });
    }
  }
}