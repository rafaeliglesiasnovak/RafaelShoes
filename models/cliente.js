module.exports = function(Sequelize, sequelize){
	var Cliente = sequelize.define('Cliente', {
		CPF_Cli: {
			type: Sequelize.BIGINT(11),
			primaryKey: true,
			autoIncrement: false
		},
		Nome_Cli: Sequelize.STRING,
		Tel_Cel_Cli: Sequelize.STRING,
		Tel_Res_Cli: Sequelize.STRING,
		Dt_Nascimento_Cli: Sequelize.DATE,
		Email_Cli: Sequelize.STRING,
		Sexo_Cli: Sequelize.STRING
	});

	return Cliente;

}
