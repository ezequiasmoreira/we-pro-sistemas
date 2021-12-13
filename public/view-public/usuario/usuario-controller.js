(function () {
    'use strict';
angular.module('public')
.controller('usuarioController', usuarioController);

function usuarioController (
    $scope,loginFactoryService,loginFactorySpec,utilFactorySpec,$state){
    
	$scope.mensagem = ''; 
    
    var viewModel = this;
    viewModel.cadastrarUsuario = cadastrarUsuario;
    

    function cadastrarUsuario (usuario) {
        try {   
            loginFactorySpec.validarSenha($scope)
            utilFactorySpec.validarEmail(usuario.email,$scope);

            loginFactoryService.cadastrar(usuario).then(successCallback, errorCallback);

            function successCallback(response){    
                $state.go('login');
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
}
})(); 