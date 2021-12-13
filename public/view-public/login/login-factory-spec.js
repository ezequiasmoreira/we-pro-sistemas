angular.module("login").factory("loginFactorySpec", function () {
    
	var _validarSenha = function ($scope) {
		let usuario = $scope.usuario;
        if (usuario.senha != usuario.confirmaSenha){
			angular.element('#senha').focus();
			throw "Senha não confere";
		}	
		return true;
	};

	var _validarFormulario = function (formulario) { 		 
		return (!formulario.$valid) ? false  : true;
	};
	
	return {
		validarSenha: _validarSenha,
		validarFormulario: _validarFormulario
	};
});