module.exports = function(Sequelize, sequelize, schema){

  var Cliente = schema.Cliente;
  var Endereco = schema.Endereco;
  var Funcionario = schema.Funcionario;

	var Pedido = sequelize.define('Pedido', {
		ID_Pedido: {
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
    ID_End: {
      type: Sequelize.INTEGER,
      references: {
        model: Endereco,
        key: 'ID_End',
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
    Tipo_Entrega: Sequelize.STRING,
    Prazo_Entrega: Sequelize.STRING,
    Forma_Entrega: Sequelize.STRING,
    Status_Pag: Sequelize.STRING,
    Forma_Pag: Sequelize.STRING
	});

	return Pedido;

}