module.exports = function(Sequelize, sequelize, schema){

  var Funcionario = schema.Funcionario;
  
	var Pedido_Funcionario_Qnt = sequelize.define('Pedido_Funcionario_Qnt', {
    ID_Func: {
      type: Sequelize.INTEGER,
      references: {
        model: Funcionario,
        key: 'ID_Func'
      }
    },
    Qnt_Pedidos : Sequelize.INTEGER
	});

	return Pedido_Funcionario_Qnt;

}