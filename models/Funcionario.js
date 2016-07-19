module.exports = function(Sequelize, sequelize){
	var Funcionario = sequelize.define('Funcionario', {
		ID_Func: {
  		type: Sequelize.INTEGER,
  		primaryKey: true,
      	autoIncrement: true
		},
		Nome_Func: Sequelize.STRING,
		Senha_Func: Sequelize.STRING,
		Setor_Func: Sequelize.STRING,
		Email_Func: Sequelize.STRING,
		Cargo_Func: Sequelize.STRING
  });

	return Funcionario;

}
