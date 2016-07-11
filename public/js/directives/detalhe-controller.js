var app = angular.module('RafaelShoes');

app.directive('detalhe', ["$rootScope", function($rootScope) {
  return {
  	restrict: 'E',
  	link: function($scope){

  		$scope.goToDetalhe = function(){
		    // TODO: passar produto para service
		    $rootScope.viewFlag = $rootScope.detalhe;
		  }


    	$scope.rootScope = $rootScope;
  	},
    templateUrl: 'views/directives/detalhe.html'
  };
}]);