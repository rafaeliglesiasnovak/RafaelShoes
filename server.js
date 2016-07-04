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
	//TODO
	var schema = {};

	//Cliente
	var cliente = {};
	cliente.controllers = {};
	cliente.controllers.cliente = require(__dirname + '/modules/cliente/cliente-controller.js')(schema);

	// Usuario
	var usuario = {};
	usuario.controllers = {};
	usuario.controllers.login = require(__dirname + '/modules/usuario/login-controller.js')(schema, app.bcrypt, app.jwt, app.config);

	//Rotas
	var routes = {};
	routes.routes = require(__dirname + '/routes/router.js')(app.express, routes);
	routes.v1 = {};
	routes.view = {};
	routes.view.view = require(__dirname + '/routes/view/view.js')(app.path);

	return {
		app: app,
		router: routes.routes
	}

}