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
      type: Sequelize.BIGINT(11),
      references: {
        model: Cliente,
        key: 'CPF_Cli'
      }
    },
    ID_End: {
      type: Sequelize.INTEGER,
      references: {
        model: Endereco,
        key: 'ID_End'  
      }
    },
    ID_Func: {
      type: Sequelize.INTEGER,
      references: {
        model: Funcionario,
        key: 'ID_Func'
      }
    },
    Tipo_Entrega: Sequelize.STRING,
    Prazo_Entrega: Sequelize.STRING,
    Forma_Entrega: Sequelize.STRING,
    Status_Pag: Sequelize.STRING,
    Forma_Pag: Sequelize.STRING,
    Status_Pedido: Sequelize.STRING,
    Frete_Pedido: Sequelize.INTEGER
	});

	return Pedido;

}