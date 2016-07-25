module.exports = function (){
	return{
		// constantes do projeto
		apiSecret : function(){
		// chave para validacao do token para usuarios comuns: rafael-shoes-api-secret md5
			return 'c952eb6adf9904d93458909af1d1cc71';
		},
		saltRounds : function(){
			return 4;
		},
		db : function(){
			return {
				db: 'pcs2034',
				user: 'rafael',
				psswrd: 'rafaelshoes',
				host: 'engsoft.cu6gpxc772wb.us-west-2.rds.amazonaws.com',
				port: 3306,
				dialect: 'mysql',
				ssl: 'Amazon RDS'
			};
		},
	};
}