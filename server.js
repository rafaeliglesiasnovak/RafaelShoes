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

	var Sequelize = require('sequelize');
	var sequelize = new Sequelize('mysql', 'root', 'r5y7f3a1', {
  		host: 'bighead.poli.usp.br',
  		dialect: 'mysql',
  		port:3306,

  		pool: {
    		max: 5,
    		min: 1,
    		idle: 1000
  		}
	});
 
	// var sequelize = new Sequelize('d7dcs092f8v6hc', 'lqvrlbjwsaelro','Rc8qZGNQbAYx0cUZaxiVZVciJ9', {
 //      dialect:  'postgres',
 //      protocol: 'postgres',
 //      dialectOptions:{
 //      	ssl: true
 //      }
 //    })

	// var sequelize = new Sequelize('postgres://lqvrlbjwsaelro:Rc8qZGNQbAYx0cUZaxiVZVciJ9@ec2-54-243-249-65.compute-1.amazonaws.com:5432/d7dcs092f8v6hc');

	sequelize
		.authenticate()
		.then(function(err) {
			console.log('Connection has been established successfully.');
		})
		.catch(function (err) {
			console.log('Unable to connect to the database:', err);
		});

	// console.log("Tentando ROdar o DB");
	// var pg = require('pg');
	// pg.connect('postgres://lqvrlbjwsaelro:Rc8qZGNQbAYx0cUZaxiVZVciJ9@ec2-54-243-249-65.compute-1.amazonaws.com:5432/d7dcs092f8v6hc?ssl=true', function(err, client, done) {
	//     if (err) return console.log(err);
	//     client.query('SELECT * FROM pg_catalog.pg_tables', function(err, result) {
	//         done();
	//         if(err) return console.error(err);
	//         console.log(result.rows);
	//     });
	// });

// var pg = require('pg');

// pg.defaults.ssl = true;
// pg.connect('postgres://lqvrlbjwsaelro:Rc8qZGNQbAYx0cUZaxiVZVciJ9@ec2-54-243-249-65.compute-1.amazonaws.com:5432/d7dcs092f8v6hc?ssl=true', function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });


	//Cliente
	var cliente = {};
	cliente.controllers = {};
	cliente.controllers.cadastro = require(__dirname + '/modules/cliente/cadastro-controller.js')(schema);
	cliente.controllers.cliente = require(__dirname + '/modules/cliente/cliente-controller.js')(schema);

	// Endereco
	var endereco = {};
	endereco.controllers.endereco = require(__dirname + '/modules/cliente/endereco-controller.js')(schema);

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