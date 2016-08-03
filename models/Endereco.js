module.exports = function(Sequelize, sequelize, schema){

  var Cliente = schema.Cliente;

	var Endereco = sequelize.define('Endereco', {
		ID_End: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
		},
  	CPF_Cli: {
      type: Sequelize.INTEGER(11),
      references: {
        model: Cliente,
        key: 'CPF_Cli'  
      }
    },
    CEP_End: Sequelize.INTEGER,
    Num_End: Sequelize.INTEGER,
    Comp_End: Sequelize.STRING,
    Log_End: Sequelize.STRING,
    Pais_End: Sequelize.STRING,
    Cid_End: Sequelize.STRING,
    Est_End: Sequelize.STRING
	});

	return Endereco;

}