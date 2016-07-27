module.exports = function (schema){
  var Produto = schema.Produto;

  return {
    post: function(req, res){
      var produto = req.body;
      produto.Imagem_Prod = req.file.filename;

      Produto.create(produto).then(function(produtoDb) {

        if(produtoDb) return res.json({success: true, message: 'Produto criado com sucesso!', response: {produto: produtoDb}});
        
        else return res.json({success: false, message: 'Falha no registro do produto.'});
      });
    },

    get: function (req, res) {
      var ID_Prod = req.query.ID_Prod;
      var Nome_Prod = req.query.Nome_Prod;

      query = {};
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
      produto.Imagem_Prod = req.file.filename;

      var query = { where: { ID_Prod: produto.ID_Prod } };

        Produto.update(produto, query).then(function(produto){
          Produto.findAll(query).then(function(produtoDb) {
            return res.json({success: true, message: 'Produto editado com sucesso.', response: {produto: produtoDb}});
          });
        });
    }
  }
}