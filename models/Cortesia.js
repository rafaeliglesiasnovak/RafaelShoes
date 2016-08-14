module.exports = function(Sequelize, sequelize){
	var Cortesia = sequelize.define('Cortesia', {
        Cortesia: Sequelize.BOOLEAN
	});

	return Cortesia;
}