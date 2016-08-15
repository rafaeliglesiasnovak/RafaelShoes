module.exports = function (transporter){

  return {
    send: function (req, res) {

      var mailOptions = {
        from: '"RafaelShoes" <3rafaelshoes@gmail.com>',
        // from: '"Contato RafaelShoes" <brandao.rafael@hotmail.com>',
        to: req.body.Email_Func,
        subject: 'Alerta de Pedido',
        text: 'O supervisor ' + req.body.Nome_Sup + '(Email ' + req.body.Email_Sup + 
          ') requer sua atenção sobre o pedido de código ' + req.body.ID_Pedido + '.\n\nAgradecemos a sua atenção'
      };

      transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            return res.json({success: true, message: 'Mensagem enviada.'});
          });
    }
  }
}