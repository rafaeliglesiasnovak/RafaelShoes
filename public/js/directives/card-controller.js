var app = angular.module('bigode');

app.directive('card', ["$http", "$rootScope", function($http, $rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

      $scope.rootScope = $rootScope;

      var initialRequest = function(){
        $http.get($rootScope.api + "v1/cliente/get-conta?_id=" + localStorage.tokenConta)
          .success(function(conta){
              $rootScope.id_restaurante = conta.response.id_restaurante;

              $scope.num_mesa = conta.response.num_mesa;

              $http.get($rootScope.api + "v1/cliente/get-restaurante?_id=" + $rootScope.id_restaurante)
                .success(function(restaurante){
                    $scope.nome_restaurante = restaurante.response.nome

                    $scope.produtos = restaurante.response.produtos

                    for(var i = 0; i < $scope.produtos.length; i++){
                      $scope.produtos[i].total = 0;
                    }
                })

          })
      }

      initialRequest();

  		$scope.checkIn = function(){
  			$http.post($rootScope.api + "v1/cliente/check-in", {"codigo_acesso": $scope.codigoMesa})
  				.success(function(data){
  					if(data.success){
  						localStorage.tokenMesa = data.conta;

  						localStorage.stage = 1;
  						localStorage.isBillOpened = true;
  					} else {
  						if(data.cod == 1){
  							//TODO colocar o que acontece se já tem uma conta aberta nessa mesa
  						} else if(data.cod == 2){
  							//TODO colocar o que acontece se não existe uma mesa para esse código
  						}
  					}
  				})
  		}

  	},
    templateUrl: 'views/directives/card.html'
  };
}]);