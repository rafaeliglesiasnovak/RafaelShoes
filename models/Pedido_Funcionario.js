module.exports = function(Sequelize, sequelize, schema){

  var Pedido = schema.Pedido;
  var Funcionario = schema.Funcionario;
  
	var Pedido_Funcionario = sequelize.define('Pedido_Funcionario', {
  	ID_Pedido: {
        type: Sequelize.INTEGER,
        references: {
            model: Pedido,
            key: 'ID_Pedido',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
              
            }
      },
      ID_Func: {
        type: Sequelize.INTEGER,
        references: {
            model: Funcionario,
            key: 'ID_Func',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
              
            }
      }
	});

	return Pedido_Funcionario;

}