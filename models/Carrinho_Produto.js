module.exports = function(Sequelize, sequelize, schema){

  var Produto = schema.Produto;
  var Carrinho = schema.Carrinho;
  
	var Carrinho_Produto = sequelize.define('Carrinho_Produto', {
      ID_Prod: {
        type: Sequelize.INTEGER,
        references: {
            model: Produto,
            key: 'ID_Prod',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
              
            }
      },
      ID_Carrinho: {
        type: Sequelize.INTEGER,
        references: {
            model: Carrinho,
            key: 'ID_Carrinho',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
              
            }
      },
      Qtd_Prod: Sequelize.INTEGER
	});

	return Carrinho_Produto;

}