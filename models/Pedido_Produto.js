module.exports = function(Sequelize, sequelize, schema){

  var Pedido = schema.Pedido;
  var Produto = schema.Produto;
  
	var Pedido_Produto = sequelize.define('Pedido_Produto', {
  	ID_Pedido: {
        type: Sequelize.INTEGER,
        references: {
            model: Pedido,
            key: 'ID_Pedido',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
              
            }
      },
      ID_Produto: {
        type: Sequelize.INTEGER,
        references: {
            model: Produto,
            key: 'ID_Produto',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
              
            }
      },
      Qtd_Prod: Sequelize.INTEGER
	});

	return Pedido_Produto;

}