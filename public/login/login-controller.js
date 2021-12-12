angular.module('login').controller('loginController', function(
    $scope,loginFactoryService,loginFactorySpec,utilFactorySpec,$http,$state){
    
    $scope.login = {};
	$scope.mensagem = ''; 

    $http.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";

    if($scope.login){
        $http.defaults.headers.common['Authorization'] = "Basic Y2xpZW50ZToxMjM=";        
    }else{
        $http.defaults.headers.common['Authorization'] = "Bearer " + token;
    }    
    
    $scope.login = function() {           
        loginFactoryService.login($scope.login).then(successCallback, errorCallback);	
        function successCallback(response){ 
            window.localStorage.setItem("token",response.data.access_token)
            window.location.href = '/principal.html#/inicio';
        }

        function errorCallback(response){ 
            var  mensagem = "E-mail ou senha incorreto."
            $scope.mensagem = mensagem;
            return;
        }       
    };

    $scope.cadastrarUsuario = function() {             
        try {
            var usuario =  $scope.usuario;

            if (!loginFactorySpec.validarFormulario($scope.formulario)) return;    
            loginFactorySpec.validarSenha($scope)
            utilFactorySpec.validarEmail(usuario.email,$scope);

            loginFactoryService.cadastrar(usuario).then(successCallback, errorCallback);

            function successCallback(response){    
                window.location.href = '../../index.html'; 
            }

            function errorCallback(response){ 
                var  mensagem = "Erro ao cadastrar o usuário"
                if (response.data ){  
                    loginFactoryService.atribuirFocoException(response.data.cause,$scope); 
                    mensagem = response.data.message;
                }           
                $scope.mensagem = mensagem;
                return;
            }         

        }catch (exception) {
            $scope.mensagem = exception
            return;
        }           
    };
});