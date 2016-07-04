module.exports = function (schema, bcrypt, jwt, config){

  var Account = schema.account;
  var Cliente = schema.user;

  return {
    post: function (req, res) {
      var email = req.body.email;

      // Procura usuario no banco
      var query = { where: {email: email} };

      Account.findOne(query).then(function(account) {
        if (!account) {
          // account nao encontrado
          return res.json({success: false, message: 'Falha na autenticação. Conta não encontrada.'});

        } 
        else if (account) {
          // compara passwords (com criptografia)
          bcrypt.compare(req.body.password, account.password, function(err, match) {
            if(!match){
              // passwords nao batem
              return res.json({success: false, message: 'Falha na autenticação. Senha incorreta.'});
            }
            else{
                // account e password batem
              var tokenSecret = config.apiSecret();
              // cria token
              var token = jwt.sign(account.toObject(), tokenSecret);

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