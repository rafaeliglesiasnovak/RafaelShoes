module.exports = function (schema){
  var Carrinho = schema.Carrinho;
  var Cliente = schema.Cliente;
  var CarrinhoProduto = schema.CarrinhoProduto;

  return {
    addItem: function(req, res){
      var CPF_Cli = req.body.CPF_Cli;
      var ID_Prod = req.body.ID_Prod;
      var Qtd_Prod = req.body.Qtd_Prod;

      Carrinho.find({where: {CPF_Cli: CPF_Cli}}).then(function(carrinhoDb){
        CarrinhoProduto.find({ where: {ID_Prod: ID_Prod, ID_Carrinho: carrinhoDb.ID_Carrinho} }).then(function(carrinhoProdutoDb){
          if(carrinhoProdutoDb){
            CarrinhoProduto.update({
              ID_Carrinho: carrinhoDb.ID_Carrinho,
              Qtd_Prod: (Qtd_Prod + carrinhoProdutoDb.Qtd_Prod)
            } , { where: {ID_Prod: ID_Prod} }).then(function(carrinhoProdutoDb){
              return res.json({success: true, message: 'Produto adicionado ao carrinho com sucesso.'});
            })
          } else {
            CarrinhoProduto.create({
              ID_Prod: ID_Prod,
              ID_Carrinho: carrinhoDb.ID_Carrinho,
              Qtd_Prod: Qtd_Prod
            }).then(function(carrinhoProdutoDb){
              return res.json({success: true, message: 'Produto adicionado ao carrinho com sucesso.'});
            })
          }
        })
      });

    },

    get: function (req, res) {
      var CPF_Cli = req.query.CPF_Cli;

      Carrinho.find({where: {CPF_Cli: CPF_Cli} }).then(function(carrinhoDb){
        CarrinhoProduto.findAll({ where: { ID_Carrinho: carrinhoDb.ID_Carrinho } }).then(function(carrinhoProdutoDb){
          if(carrinhoProdutoDb) return res.json({success: true, message: 'Produtos do carrinho encontrado com sucesso', response: {produtos: carrinhoProdutoDb}});
        
          else return res.json({success: false, message: 'Falha na busca de carrinho.'});
        })
      });
    },

    delItem: function (req, res){
      var CPF_Cli = req.body.CPF_Cli;
      var ID_Prod = req.body.ID_Prod;

      Carrinho.find({where: {CPF_Cli: CPF_Cli}}).then(function(carrinhoDb){
        CarrinhoProduto.destroy({ where : {ID_Prod: ID_Prod}})
          .then(function(carrinhoProdutoDb){
            return res.json({success: true, message: 'Produto removido do carrinho com sucesso.'});
          })
      });
    },

    editItem: function (req, res){
      var CPF_Cli = req.body.CPF_Cli;
      var ID_Prod = req.body.ID_Prod;
      var Qtd_Prod = req.body.Qtd_Prod;

      if(Qtd_Prod == 0){
        return this.delItem(req, res);
      }

      Carrinho.find({where: {CPF_Cli: CPF_Cli}}).then(function(carrinhoDb){
        CarrinhoProduto.find({ where: {ID_Prod: ID_Prod, ID_Carrinho: carrinhoDb.ID_Carrinho} }).then(function(carrinhoProdutoDb){
          if(carrinhoProdutoDb){
            CarrinhoProduto.update({
              ID_Carrinho: carrinhoDb.ID_Carrinho,
              Qtd_Prod: Qtd_Prod
            } , { where: {ID_Prod: ID_Prod} }).then(function(carrinhoProdutoDb){
              return res.json({success: true, message: 'Produto modificado com sucesso.'});
            })
          } else {
            return res.json({success: false, message: 'Produto não encontrado no carrinho.'});
          }
        })
      });

    },

    limpar: function (req, res){
      var CPF_Cli = req.body.CPF_Cli;

      Carrinho.find({where: {CPF_Cli: CPF_Cli}}).then(function(carrinhoDb){
        CarrinhoProduto.destroy({ where : {ID_Carrinho: carrinhoDb.ID_Carrinho}})
          .then(function(carrinhoProdutoDb){
            return res.json({success: true, message: 'Carrinho limpado com sucesso.'});
          })
      });
    }
  }
}