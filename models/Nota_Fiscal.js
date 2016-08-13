module.exports = function(Sequelize, sequelize, schema){

  var Pedido = schema.Pedido;
  
	var Nota_Fiscal = sequelize.define('Nota_Fiscal', {
		ID_Nota: {
  		type: Sequelize.INTEGER,
  		primaryKey: true,
      autoIncrement: true
		},
    ID_Pedido: {
      type: Sequelize.INTEGER,
      references: {
        model: Pedido,
        key: 'ID_Pedido' 
      }
    },
    Data_Nota: Sequelize.DATE,
	});

	return Nota_Fiscal;

}