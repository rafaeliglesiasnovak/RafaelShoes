module.exports = function (schema, sequelize){
    var Pedido = schema.Pedido;
    var PedidoFuncionarioQnt = schema.PedidoFuncionarioQnt;
    var PedidoProduto = schema.PedidoProduto;
    var CarrinhoProduto = schema.CarrinhoProduto;
    var NotaFiscal = schema.NotaFiscal;
    var Produto = schema.Produto;

  return {
    post: function(req, res){
        var pedido = req.body;

        PedidoFuncionarioQnt.find({order: 'Qnt_Pedidos ASC'}).then(function(PedidoFuncionarioQntDb){
            PedidoFuncionarioQnt.update({Qnt_Pedidos: PedidoFuncionarioQntDb.Qnt_Pedidos+1}, {where: {ID_Func: PedidoFuncionarioQntDb.ID_Func}})
                .then(function(db){

                    pedido.ID_Func = PedidoFuncionarioQntDb.ID_Func;
                    var d = new Date();
                    pedido.Prazo_Entrega = d.setDate(d.getDate() + 7);
                    pedido.Status_Pag = "Aguardando";

                    Pedido.create(pedido).then(function(pedidoDb){
                        NotaFiscal.create({ID_Pedido: pedidoDb.ID_Pedido,Data_Nota: new Date()}).then(function(notaDb){
                            CarrinhoProduto.findAll({where:{CPF_Cli: pedido.CPF_Cli}}).then(function(carrinhoProdutoDB){

                                var produtos = [];
                                for(var i = 0; i < carrinhoProdutoDB.length; i++){
                                    produtos.push({ID_Pedido:pedidoDb.ID_Pedido, ID_Prod: carrinhoProdutoDB[i].ID_Prod, Qtd_Prod: carrinhoProdutoDB[i].Qtd_Prod});
                                }

                                PedidoProduto.bulkCreate(produtos).then(function(){
                                    CarrinhoProduto.destroy({ where : {CPF_Cli: pedido.CPF_Cli}})
                                        .then(function(carrinhoProdutoDb){
                                            var produtosUpdated = 0;
                                            for(var j = 0; j < carrinhoProdutoDB.length; j++){
                                                Produto.update({Estoque_Prod: sequelize.literal('Estoque_Prod -' + carrinhoProdutoDB[j].Qtd_Prod)}, {where: { ID_Prod: carrinhoProdutoDB[j].ID_Prod } })
                                                    .then(function(produtoDb){
                                                        produtosUpdated++;
                                                        if(produtosUpdated == carrinhoProdutoDB.length){
                                                            return res.json({success: true, message: 'Pedido Finalizado com sucesso.'});
                                                        }
                                                    });
                                            }
                                        });
                                });
                            });
                        });
                    })
                })
        })
    },

    get: function (req, res) {
        var CPF_Cli = req.query.CPF_Cli;
        var ID_Func = req.query.ID_Func;

        query = {include: [NotaFiscal, PedidoProduto]};
        if(CPF_Cli){
            query.where = {CPF_Cli: CPF_Cli};
        } else if(ID_Func){
            query.where = {ID_Func: ID_Func};
        }

        Pedido.findAll(query).then(function(pedidoDb){
            return res.json({success: true, message: 'Pedidos encontrados com sucesso.', response: {pedidos: pedidoDb}});
        })
    },

    update: function (req, res){
        var pedido = req.body;

        var query = {where: {ID_Pedido: pedido.ID_Pedido}};

        Pedido.update(pedido, query).then(function(pedido){
            Pedido.findAll(query).then(function(pedidos) {
                return res.json({success: true, message: 'Pedido editado com sucesso.', response: {pedidos: pedidos}});
            });
        });
    },

    delete: function (req, res){
        var ID_Pedido = req.query.ID_Pedido;

        Pedido.destroy({
            where: {
                ID_Pedido: ID_Pedido
            }
        }).then(function(){
            return res.json({success: true, message: 'Pedido excluido com sucesso.'});
        });
    }
  }
}