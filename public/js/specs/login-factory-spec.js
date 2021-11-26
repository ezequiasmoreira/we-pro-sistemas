angular.module("projetoTecnico").factory("loginFactorySpec", function () {
    
	let _validarSenha = function ($scope) {
		let usuario = $scope.usuario;
        if (usuario.senha != usuario.confirmaSenha){
			$scope.$broadcast('validarSenha');
			throw "Senha não confere";
		}	
		return true;
	};

	let _validarFormulario = function (formulario) { 		 
		return (!formulario.$valid) ? false  : true;
	};
	
	return {
		validarSenha: _validarSenha,
		validarFormulario: _validarFormulario
	};
});