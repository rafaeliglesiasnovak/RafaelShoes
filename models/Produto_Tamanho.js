module.exports = function(Sequelize, sequelize, schema){
    var Produto = schema.Produto;
    
	var Produto_Tamanho = sequelize.define('Produto_Tamanho', {
        ID_Prod: {
          type: Sequelize.INTEGER,
          references: {
            model: Produto,
            key: 'ID_Prod'
          }
        },
        Estoque_Prod: Sequelize.INTEGER,
        Tamanho_Prod: Sequelize.INTEGER    
	});

	return Produto_Tamanho;

}