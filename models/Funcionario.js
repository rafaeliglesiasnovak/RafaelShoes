module.exports = function(Sequelize, sequelize){
	var Funcionario = sequelize.define('Funcionario', {
		ID_Func: {
	  		type: Sequelize.INTEGER,
	  		primaryKey: true,
	      	autoIncrement: true
		},
		Tipo_Func: Sequelize.STRING,
		Nome_Func: Sequelize.STRING,
		Email_Func: Sequelize.STRING,
		Cargo_Func: Sequelize.STRING
  });

	return Funcionario;

}
