module.exports = function (schema, bcrypt, crypto){
  var Cliente = schema.Cliente;
  var Account = schema.Account;

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
    }
  }
}