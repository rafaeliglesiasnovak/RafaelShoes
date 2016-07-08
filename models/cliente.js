module.exports = function(Sequelize, sequelize){
	var User = sequelize.define('Cliente', {
		CPF_Cli: {
    		type: Sequelize.BIGINT,
    		primaryKey: true
  		},
  		Nome_Cli: Sequelize.STRING,
  		Tel_Cel_Cli: Sequelize.STRING,
  		Tel_Res_Cli: Sequelize.STRING,
  		Senha_Cli: Sequelize.STRING,
  		Dt_Nascimento_Cli: Sequelize.DATE,
  		Email_Cli: Sequelize.STRING,
  		Sexo_Cli: Sequelize.STRING
	});

	sequelize
	  .sync()
	  .then(function(err) {
	    console.log('It worked!');
	  }, function (err) { 
	    console.log('An error occurred while creating the table:', err);
	  });

	return User;

}
