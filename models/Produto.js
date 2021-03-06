module.exports = function(Sequelize, sequelize){
	var Produto = sequelize.define('Produto', {
    	ID_Prod: {
      		type: Sequelize.INTEGER,
      		primaryKey: true,
          autoIncrement: true
    	},
        Nome_Prod: Sequelize.STRING,
        Desc_Prod: Sequelize.STRING,
        Fornecedor_Prod: Sequelize.STRING,
        Cor_Prod: Sequelize.STRING,
        Peso_Prod: Sequelize.FLOAT,
        Larg_Prod: Sequelize.FLOAT,
        Comp_Prod: Sequelize.FLOAT,
        Alt_Prod: Sequelize.FLOAT,
        Preco_Prod: Sequelize.FLOAT,
        Imagem_Prod: Sequelize.STRING
	});

	return Produto;

}