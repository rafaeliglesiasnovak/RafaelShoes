module.exports = function(Sequelize, sequelize, schema){

  var Pedido = schema.Pedido;
  var Funcionario = schema.Funcionario;

	var Alerta = sequelize.define('Alerta', {
		ID_Alerta: {
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
    ID_Func: {
      type: Sequelize.INTEGER,
      references: {
        model: Funcionario,
        key: 'ID_Func'
      }
    }
	});

	return Alerta;

}