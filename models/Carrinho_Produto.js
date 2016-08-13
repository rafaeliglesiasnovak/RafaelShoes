module.exports = function(Sequelize, sequelize, schema){

  var Produto = schema.Produto;
  var Cliente = schema.Cliente;
  
	var Carrinho_Produto = sequelize.define('Carrinho_Produto', {
      ID_Prod: {
        type: Sequelize.INTEGER,
        references: {
          model: Produto,
          key: 'ID_Prod'
        }
      },
      CPF_Cli: {
        type: Sequelize.BIGINT(11),
        references: {
          model: Cliente,
          key: 'CPF_Cli' 
        }
      },
      Qtd_Prod: Sequelize.INTEGER
	});

	return Carrinho_Produto;

}