module.exports = function(Sequelize, sequelize, schema){

  var Pedido = schema.Pedido;
  
	var Nota_Fiscal = sequelize.define('Nota_Fiscal', {
		ID_Nota: {
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
    Data_Nota: Sequelize.DATE,
	});

	return Nota_Fiscal;

}