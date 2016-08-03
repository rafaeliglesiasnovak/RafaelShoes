module.exports = function (schema, bcrypt, crypto, transporter){
  var Account = schema.Account;
  
  var makeSenha = function()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

  return {
    get: function (req, res) {
      var Login = req.query.Login;

      var query = {};
      if(Login){
        query.where = {Login: Login};
      }

      Account.findAll(query).then(function(accounts) {
        return res.json({success: true, message: 'Contas encontrados.', response: {contas: accounts}});
      });
    },

    forgotPassword: function(req, res){
      var Login = req.body.Login;
      var Senha = makeSenha();

      var mailOptions = {
        from: '"RafaelShoes" <3rafaelshoes@gmail.com>',
        to: Login,
        subject: 'Nova senha do sistema RafaelShoes',
        text: 'Sua nova senha do sistema é ' + Senha + '.\nAconselhamos a mudar essa senha o quanto antes.'
      };

      var md5 = crypto.createHash('md5').update(Senha).digest("hex");
      bcrypt.hash(md5, 4, function(err, hash) {
        Senha = hash;

        Account.update({ Senha: Senha }, { where: { Login: Login } }).then(function(accountDb){
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            return res.json({success: true, message: 'Senha modificada.'});
          });
        })
      });  
    }
  }
}