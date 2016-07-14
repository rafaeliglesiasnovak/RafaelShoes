module.exports = function(){
	var app = {};
	//http://expressjs.com/
	app.express 		= require('express');
	//https://nodejs.org/api/path.html
	app.path 			= require('path');
	// http://www.embeddedjs.com/
	app.ejs 			= require('ejs');
	//https://nodejs.org/api/http.html#http_http
	app.http 			= require('http');
	//https://github.com/expressjs/morgan
	app.morgan         	= require('morgan');
	//Esse é o que deixa eu usar req.body https://github.com/expressjs/body-parser
	app.bodyParser     	= require('body-parser');
	//https://github.com/expressjs/method-override
	app.methodOverride 	= require('method-override');
	//
	app.bcrypt 			= require('bcryptjs');
	//
	app.jwt 			= require('jsonwebtoken');
	//
	app._				= require('lodash');
	//
	app.crypto			= require('crypto');
	// Arquivo de configuracoes
  	app.config = require('./config')();

	//SQL
	var Sequelize = require('sequelize');
	var sequelize = new Sequelize(app.config.db().db, app.config.db().user, app.config.db().psswrd, {
  		host: app.config.db().host,
  		dialect: app.config.db().dialect,
  		port: app.config.db().port,
  		pool: {
    		max: 5,
    		min: 1,
    		idle: 1000
  		},
  		dialectOptions: {
    		ssl: app.config.db().ssl
  		},
  		quoteIdentifiers:false,
  		omitNull: true
	});
	sequelize
		.authenticate()
		.then(function(err) {
			console.log('Connection has been established successfully.');
		})
		.catch(function (err) {
			console.log('Unable to connect to the database:', err);
		});

	//Schema
	var schema = {};
	schema.Cliente = require(__dirname + '/models/Cliente.js')(Sequelize, sequelize);
	schema.Endereco = require(__dirname + '/models/Endereco.js')(Sequelize, sequelize, schema);
	schema.Funcionario = require(__dirname + '/models/Funcionario.js')(Sequelize, sequelize);
	schema.Pedido = require(__dirname + '/models/Pedido.js')(Sequelize, sequelize, schema);
	schema.Alerta = require(__dirname + '/models/Alerta.js')(Sequelize, sequelize, schema);
	schema.Carrinho = require(__dirname + '/models/Carrinho.js')(Sequelize, sequelize, schema);
	schema.NotaFiscal = require(__dirname + '/models/Nota_Fiscal.js')(Sequelize, sequelize, schema);
	schema.Produto = require(__dirname + '/models/Produto.js')(Sequelize, sequelize);
	schema.CarrinhoProduto = require(__dirname + '/models/Carrinho_Produto.js')(Sequelize, sequelize, schema);
	schema.PedidoFuncionario = require(__dirname + '/models/Pedido_Funcionario.js')(Sequelize, sequelize, schema);
	schema.PedidoProduto = require(__dirname + '/models/Pedido_Produto.js')(Sequelize, sequelize, schema);
	schema.Account = require(__dirname + '/models/Account.js')(Sequelize, sequelize, schema);

	sequelize
	  .sync()
	  .then(function(err) {
	    console.log('It worked!');
	  }, function (err) { 
	    console.log('An error occurred while creating the table:', err);
	  });

	//Teste
	var teste = {};
	teste.controllers = {};
	teste.controllers.db = require(__dirname + '/modules/teste/teste-controller.js')(schema);

	//Cliente
	var cliente = {};
	cliente.controllers = {};
	cliente.controllers.cadastro = require(__dirname + '/modules/cliente/cadastro-controller.js')(schema, app.bcrypt, app.crypto);
	cliente.controllers.cliente = require(__dirname + '/modules/cliente/cliente-controller.js')(schema);

	// Endereco
	var endereco = {};
	endereco.controllers = {};
	endereco.controllers.endereco = require(__dirname + '/modules/endereco/endereco-controller.js')(schema);

	// Usuario
	var usuario = {};
	usuario.controllers = {};
	usuario.controllers.login = require(__dirname + '/modules/usuario/login-controller.js')(schema, app.bcrypt, app.jwt, app.config);

	//Rotas
	var routes = {};
	routes.routes = require(__dirname + '/routes/router.js')(app.express, routes);
	routes.v1 = {};
	routes.v1.teste = require(__dirname + '/routes/v1/teste.js')(teste);
	routes.v1.cadastro = require(__dirname + '/routes/v1/cadastro.js')(cliente);
	routes.v1.cliente = require(__dirname + '/routes/v1/cliente.js')(cliente);
	routes.v1.endereco = require(__dirname + '/routes/v1/endereco.js')(endereco);
	routes.v1.usuario = require(__dirname + '/routes/v1/usuario.js')(cliente);
	routes.view = {};
	routes.view.view = require(__dirname + '/routes/view/view.js')(app.path);

	return {
		app: app,
		router: routes.routes
	}

}