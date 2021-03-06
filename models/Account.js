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
      type: Sequelize.BIGINT(11),
      references: {
        model: Cliente,
        key: 'CPF_Cli'
      } 
    },
    ID_Func: {
      type: Sequelize.INTEGER,
      references: {
        model: Funcionario,
        key: 'ID_Func'
      }
    },
    Cargo_Func: Sequelize.STRING,
    Login: Sequelize.STRING,
    Senha: Sequelize.STRING,    
    Is_Cli: Sequelize.BOOLEAN
	});

	return Account;

}