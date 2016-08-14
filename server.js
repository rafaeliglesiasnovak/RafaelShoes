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
	//https://www.npmjs.com/package/bcryptjs
	app.bcrypt 			= require('bcryptjs');
	//https://github.com/auth0/node-jsonwebtoken
	app.jwt 			= require('jsonwebtoken');
	//https://lodash.com/
	app._				= require('lodash');
	//https://nodejs.org/api/crypto.html
	app.crypto			= require('crypto');
	//https://github.com/expressjs/multer
	app.multer  		= require('multer');
	// Arquivo de configuracoes
  	app.config 			= require('./config')();

	// https://github.com/nodemailer/nodemailer
	var nodemailer = require('nodemailer');
  	var transporter = nodemailer.createTransport('smtps://3rafaelshoes@gmail.com:rafaelrafaelrafael@smtp.gmail.com');

	// http://docs.sequelizejs.com/en/latest/
	var Sequelize = require('sequelize');
	var sequelize = new Sequelize(app.config.db().db, app.config.db().user, app.config.db().psswrd, {
  		host: app.config.db().host,
  		dialect: app.config.db().dialect,
  		port: app.config.db().port,
  		pool: {
    		max: 5,
    		min: 1,
    		idle: 100
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
	schema.NotaFiscal = require(__dirname + '/models/Nota_Fiscal.js')(Sequelize, sequelize, schema);
	schema.Produto = require(__dirname + '/models/Produto.js')(Sequelize, sequelize);
	schema.CarrinhoProduto = require(__dirname + '/models/Carrinho_Produto.js')(Sequelize, sequelize, schema);
	schema.PedidoProduto = require(__dirname + '/models/Pedido_Produto.js')(Sequelize, sequelize, schema);
	schema.Account = require(__dirname + '/models/Account.js')(Sequelize, sequelize, schema);
	schema.PedidoFuncionarioQnt = require(__dirname + '/models/Pedido_Funcionario_Qnt.js')(Sequelize, sequelize, schema);
	schema.ProdutoTamanho = require(__dirname + '/models/Produto_Tamanho.js')(Sequelize, sequelize, schema);

	// Schema Assotiations
	//Account
	schema.Cliente.hasOne(schema.Account, {foreignKey: 'CPF_Cli', onDelete: 'CASCADE'});
	schema.Funcionario.hasOne(schema.Account, {foreignKey: 'ID_Func', onDelete: 'CASCADE'});
	//Alerta
	schema.Alerta.belongsTo(schema.Pedido, {foreignKey: 'ID_Pedido', onDelete: 'CASCADE'});
	schema.Alerta.belongsTo(schema.Funcionario, {foreignKey: 'ID_Func', onDelete: 'CASCADE'});
	//Carrinho_Produto
	schema.CarrinhoProduto.belongsTo(schema.Cliente, {foreignKey: 'CPF_Cli', onDelete: 'CASCADE'});
	schema.CarrinhoProduto.belongsTo(schema.Produto, {foreignKey: 'ID_Prod'});
	//Endereço
	schema.Endereco.belongsTo(schema.Cliente, {foreignKey: 'CPF_Cli', onDelete: 'CASCADE'});
	//Funcionario
	schema.Funcionario.hasOne(schema.PedidoFuncionarioQnt, {foreignKey: 'ID_Func', onDelete: 'CASCADE'});
	//Pedido
	schema.Pedido.belongsTo(schema.Cliente, {foreignKey: 'CPF_Cli', onDelete: 'CASCADE'});
	schema.Pedido.belongsTo(schema.Funcionario, {foreignKey: 'ID_Func'});
	schema.Pedido.hasOne(schema.NotaFiscal, {foreignKey: 'ID_Pedido', onDelete: 'CASCADE'});
	schema.Pedido.hasMany(schema.PedidoProduto, {foreignKey: 'ID_Pedido', onDelete: 'CASCADE'});
	//Pedido_Funcionario_Qnt
	schema.PedidoFuncionarioQnt.belongsTo(schema.Funcionario, {foreignKey: 'ID_Func', onDelete: 'CASCADE'});
	//Pedido_Produto
	schema.PedidoProduto.belongsTo(schema.Produto, {foreignKey: 'ID_Prod', onDelete: 'CASCADE'});
	//Produto
	schema.Produto.hasMany(schema.ProdutoTamanho, {foreignKey: 'ID_Prod', onDelete: 'CASCADE'});

	sequelize
	  // .sync({force: true})
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

	//Middleware
	var middleware = {};
	var storage = app.multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, __dirname + '/public/images/produto/')
	  },
	  filename: function (req, file, cb) {
	    app.crypto.pseudoRandomBytes(16, function (err, raw) {
	      cb(null, raw.toString('hex') + app.path.extname(file.originalname));
	    });
	  }
	});
	middleware.upload = app.multer({ storage: storage });

	//Cliente
	var cliente = {};
	cliente.controllers = {};
	cliente.controllers.cliente = require(__dirname + '/modules/cliente/cliente-controller.js')(schema, app.bcrypt, app.crypto);

	//Cadastro
	var cadastro = {};
	cadastro.controllers = {};
	cadastro.controllers.cadastro = require(__dirname + '/modules/cadastro/cadastro-controller.js')(schema, app.bcrypt, app.crypto, transporter);

	// Endereco
	var endereco = {};
	endereco.controllers = {};
	endereco.controllers.endereco = require(__dirname + '/modules/endereco/endereco-controller.js')(schema);

	// Usuario
	var usuario = {};
	usuario.controllers = {};
	usuario.controllers.login = require(__dirname + '/modules/usuario/login-controller.js')(schema, app.bcrypt, app.jwt, app.config);

	// Produto
	var produto = {};
	produto.controllers = {};
	produto.controllers.produto = require(__dirname + '/modules/produto/produto-controller.js')(schema);

	// Carrinho
	var carrinho = {};
	carrinho.controllers = {};
	carrinho.controllers.carrinho = require(__dirname + '/modules/carrinho/carrinho-controller.js')(schema);

	// Funcionario
	var funcionario = {};
	funcionario.controllers = {};
	funcionario.controllers.funcionario = require(__dirname + '/modules/funcionario/funcionario-controller.js')(schema, app.bcrypt, app.crypto);

	// Pedido
	var pedido = {};
	pedido.controllers = {};
	pedido.controllers.pedido = require(__dirname + '/modules/pedido/pedido-controller.js')(schema, sequelize, transporter);

	// Contato
	var contato = {};
	contato.controllers = {};
	contato.controllers.contato = require(__dirname + '/modules/contato/contato-controller.js')(transporter);

	//Rotas
	var routes = {};
	routes.routes = require(__dirname + '/routes/router.js')(app.express, routes);
	routes.v1 = {};
	routes.v1.teste = require(__dirname + '/routes/v1/teste.js')(teste);
	routes.v1.cadastro = require(__dirname + '/routes/v1/cadastro.js')(cadastro);
	routes.v1.cliente = require(__dirname + '/routes/v1/cliente.js')(cliente);
	routes.v1.endereco = require(__dirname + '/routes/v1/endereco.js')(endereco);
	routes.v1.usuario = require(__dirname + '/routes/v1/usuario.js')(usuario);
	routes.v1.produto = require(__dirname + '/routes/v1/produto.js')(produto, middleware.upload);
	routes.v1.carrinho = require(__dirname + '/routes/v1/carrinho.js')(carrinho);
	routes.v1.funcionario = require(__dirname + '/routes/v1/funcionario.js')(funcionario);
	routes.v1.pedido = require(__dirname + '/routes/v1/pedido.js')(pedido);
	routes.v1.contato = require(__dirname + '/routes/v1/contato.js')(contato);
	routes.view = {};
	routes.view.view = require(__dirname + '/routes/view/view.js')(app.path);

	return {
		app: app,
		router: routes.routes
	}

}