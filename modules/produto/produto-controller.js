module.exports = function (schema){
  var Produto = schema.Produto;
  var ProdutoTamanho = schema.ProdutoTamanho;

  return {
    post: function(req, res){
      var produto = {
        Nome_Prod: req.body.Nome_Prod,
        Desc_Prod: req.body.Desc_Prod,
        Fornecedor_Prod: req.body.Fornecedor_Prod,
        Cor_Prod: req.body.Cor_Prod,
        Peso_Prod: req.body.Peso_Prod,
        Larg_Prod: req.body.Larg_Prod,
        Comp_Prod: req.body.Comp_Prod,
        Alt_Prod: req.body.Alt_Prod,
        Preco_Prod: req.body.Preco_Prod,
        Imagem_Prod: req.file.filename
      }


      Produto.create(produto).then(function(produtoDb) {

        for(var i = 0; i < req.body.tamanhos.length; i++){
          req.body.tamanhos[i].ID_Prod = produtoDb.ID_Prod;
        }

        ProdutoTamanho.bulkCreate(req.body.tamanhos).then(function(){
          if(produtoDb) return res.json({success: true, message: 'Produto criado com sucesso!', response: {produto: produtoDb}});
        
          else return res.json({success: false, message: 'Falha no registro do produto.'});
        });
      });
    },

    get: function (req, res) {
      var ID_Prod = req.query.ID_Prod;
      var Nome_Prod = req.query.Nome_Prod;

      query = {include: [ProdutoTamanho]};
      if(ID_Prod){
        query.where = {ID_Prod: ID_Prod};
      } else if (Nome_Prod){
        query.where = {Nome_Prod: {$like: Nome_Prod + "%"}};
      }

      Produto.findAll(query).then(function(produtosDb) {
        return res.json({success: true, message: 'Produtos encontrados.', response: {produtos: produtosDb}});
      });
    },

    deletar: function (req, res){
      var ID_Prod = req.query.ID_Prod;

      Produto.destroy({
        where: {
          ID_Prod: ID_Prod
        }
      }).then(function(){
        return res.json({success: true, message: 'Produto excluido com sucesso.'});
      });
    },

    editar: function (req, res){
      var produto = req.body;
      if(req.file){
        produto.Imagem_Prod = req.file.filename;
      }

      console.log(produto);

      var query = { where: { ID_Prod: produto.ID_Prod } };

        Produto.update(produto, query).then(function(produtoDB){
          Produto.findAll(query).then(function(produtoDb) {
            var aux = 0;
            for(var i = 0; i < produto.Produto_Tamanhos.length; i++){
              ProdutoTamanho.update(produto.Produto_Tamanhos[i], {where: {ID_Prod: produto.ID_Prod, Tamanho_Prod: produto.Produto_Tamanhos[i].Tamanho_Prod}})
                .then(function(data){
                  aux++;
                  if(aux == produto.Produto_Tamanhos.length){
                    return res.json({success: true, message: 'Produto editado com sucesso.', response: {produto: produtoDb}});
                  }
                })
            }
          });
        });
    }
  }
}