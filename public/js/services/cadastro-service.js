var app = angular.module('RafaelShoes');

// each function returns a promise object 
app.factory('CadastroService', ['$http', 'localStorageService', function($http, localStorageService) {
    var CadastroService = {
        cadastra
    };

    return CadastroService;


    function getRankGeral() {
        var empresa = localStorageService.get('empresa');
        var userID = localStorageService.get('userID');
        return $http.get('/api/ranking-geral/empresa=' + empresa + '/userID=' + userID)
            .success(function(data) {
                if (data.success === false) {
                    return data.message;
                };
                return data.response;
            })
            .error(function(err) {
                return err;
            });
    }

    function getRankDepartamento(departamento) {
        var empresa = localStorageService.get('empresa');
        var userID = localStorageService.get('userID');
        return $http.get('/api/ranking-departamento/empresa=' + empresa + '/departamento=' + departamento + '/userID=' + userID)
            .success(function(data) {
                if (data.success === false) {
                    return data.message;
                };
                return data.response;
            })
            .error(function(err) {
                return err;
            });
    }

    function getRankUsuario(userId) {
        return $http.get('/api/ranking-usuario?id=' + userId)
            .success(function(data) {
                if (data.success === false) {
                    return data.message;
                };
                return data.response;
            })
            .error(function(err) {
                return err;
            });
    }

    function postRankUsuarios(departamento) {
        return $http.post('/api/ranking-usuarios/departamento=' + departamento)
            .success(function(data) {
                if (data.success === false) {
                    return data.message;
                };
                return data.response;
            })
            .error(function(err) {
                return err;
            });
    }

}]);
