module.exports = function(Sequelize, sequelize, schema){

  var Cliente = schema.Cliente;
  var Funcionario = schema.Funcionario;

	var Account = sequelize.define('Account', {
		ID_Account: {
  		type: Sequelize.INTEGER,
  		primaryKey: true,
      autoIncrement: true
		},
    CPF_Cli: {
      type: Sequelize.INTEGER,
      references: {
        model: Cliente,
        key: 'CPF_Cli',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      } 
    },
    ID_Func: {
      type: Sequelize.INTEGER,
      references: {
        model: Funcionario,
        key: 'ID_Func',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE 
      }
    },
    Login: Sequelize.STRING,
    Senha: Sequelize.STRING,    
    Is_Cli: Sequelize.BOOLEAN
	});

	return Account;

}