module.exports = function(Sequelize, sequelize, schema){

  var Cliente = schema.Cliente;
  
	var Carrinho = sequelize.define('Carrinho', {
		ID_Carrinho: {
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
   }
	});

	return Carrinho;

}
