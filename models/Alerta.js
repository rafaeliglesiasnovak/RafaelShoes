module.exports = function(Sequelize, sequelize, schema){

  var Pedido = schema.Pedido;
  var Funcionario = schema.Funcionario;

	var Alerta = sequelize.define('Alerta', {
		ID_Alerta: {
    		type: Sequelize.INTEGER,
    		primaryKey: true
  		},
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

	return Alerta;

}