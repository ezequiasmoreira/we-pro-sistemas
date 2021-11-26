angular.module("projetoTecnico").factory("loginFactoryService", function ($http,config) {
    
        var _login = function (login) { 
                var urlLogin = "/oauth/token?grant_type=password&username="+login.email+"&password="+login.senha;                
                return $http.post(config.baseUrl + urlLogin); 
        };

        var _cadastrar = function (usuario) {   
                return $http.post(config.baseUrl + '/usuarios', usuario);  	
        };

        var _atribuirFocoException = function (campo,$scope){
                switch (campo) {
                        case "email":
                                $scope.$broadcast('validarEmail');;
                                break;
                        case "senha":
                                $scope.$broadcast('validarSenha');;
                                break;
                }
        }

        return {
                login: _login,
                cadastrar: _cadastrar,
                atribuirFocoException: _atribuirFocoException
        };
});