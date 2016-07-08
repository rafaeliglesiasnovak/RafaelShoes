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
	// Arquivo de configuracoes
  	app.config = require('./config')();

	//SQL
	var Sequelize = require('sequelize');
	var sequelize = new Sequelize('pcs2034', 'rafael', 'rafaelshoes', {
  		host: 'pcs.cu6gpxc772wb.us-west-2.rds.amazonaws.com',
  		dialect: 'postgres',
  		port:5432,
  		pool: {
    		max: 5,
    		min: 1,
    		idle: 1000
  		},
  		dialectOptions: {
    		ssl: 'Amazon RDS'
  		}
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
	schema.cliente = require(__dirname + '/models/cliente.js')(Sequelize, sequelize);

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
	cliente.controllers.cadastro = require(__dirname + '/modules/cliente/cadastro-controller.js')(schema);
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
	routes.view = {};
	routes.view.view = require(__dirname + '/routes/view/view.js')(app.path);

	return {
		app: app,
		router: routes.routes
	}

}